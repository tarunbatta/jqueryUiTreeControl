/*
 * jQuery UI Treeview Plugin Library
 * http://tarunbatta.blogspot.com/
 *
 * Copyright (c) 2013 Tarun Batta
 * Licensed under BTechCo licenses.
 * https://github.com/btechco/jqueryui_treeview/wiki
 *
 */

(function ($) {

    $treedatatype = {
        Json: 1
        , Xml: 2
    }

    $treedataformat = {
        Linear: 1
        , Hierarchy: 2
    }

    var $defaults = {
        containerid: null
        , url: null
        , async: false
        , dataset: null
        , datatype: $treedatatype.Json
        , dataformat: $treedataformat.Hierarchy
        , collapse_carat_class: "ui-icon-folder-collapsed"
        , expand_carat_class: "ui-icon-folder-open"
        , item_carat_class: "ui-icon-document"
        , collapse_tree: false
        , node_highlight: "ui-state-highlight"
        , add_node_class: "ui-icon-plusthick"
        , remove_node_class: "ui-icon-minusthick"
        , show_node_add: false
        , show_node_remove: false
        , node_remove_message: "Are you sure you want to remove this node?"
        , onstart: function () { }
        , onend: function () { }
        , onprocessingstart: function () { }
        , onprocessingcomplete: function () { }
        , onprocessingerror: function (xhr, ajaxOptions, thrownError) { }
        , beforedataconversion: function () { }
        , afterdataconversion: function () { }
        , onrenderstart: function () { }
        , onrendercomplete: function () { }
    };

    var $settings = $defaults;

    $.fn.btechcotree = function (options) {
        $settings = $.extend({}, $defaults, options);

        var tree_datastructure = [];
        var displaytree = "";

        Initialize();

        function Initialize() {
            $settings.onstart();

            $settings.onprocessingstart();
            BuildTreeDataStructure();
            $settings.onprocessingcomplete();

            $settings.onrenderstart();
            BuildTree();
            $settings.onrendercomplete();

            $settings.onend();
        }

        function BuildTreeDataStructure() {
            if ($settings.url != null && $settings.url.length > 0) {
                var datatype = "";
                switch ($settings.datatype) {
                    case 1:
                        datatype = "json";
                        break;
                    case 2:
                        datatype = "xml";
                        break;
                }

                $.ajax({
                    type: "GET"
                    , async: $settings.async
                    , url: $settings.url
                    , dataType: datatype
                    , success: function (data) {
                        $settings.dataset = data;
                    }
                    , error: function (xhr, ajaxOptions, thrownError) {
                        $settings.onprocessingerror(xhr, ajaxOptions, thrownError);                        
                    }
                });
            }

            $settings.beforedataconversion();
            switch ($settings.datatype) {
                case 1:
                    switch ($settings.dataformat) {
                        case 1:
                            ConvertJsonLinearToTreeObject();
                            break;
                        case 2:
                            tree_datastructure = $settings.dataset[0].root;
                            break;
                    }
                    break;
                case 2:
                    switch ($settings.dataformat) {
                        case 1:
                            ConvertLinearXmlToTreeObject();
                            break;
                        case 2:
                            ConvertHierarchyXmlToTreeObject();
                            break;
                    }
                    break;
            }
            $settings.afterdataconversion();
        }

        function ConvertJsonLinearToTreeObject() {
            $($settings.dataset[0].root).each(function (key, value) {
                var node = { id: this.id, name: this.name, parentId: this.parentId, href: this.href, childnodes: [] };

                if (tree_datastructure.length == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function ConvertLinearXmlToTreeObject() {
            $($settings.dataset).find("node").each(function (key, value) {
                var node = { id: this.id, name: $(this).attr("name"), parentId: $(this).attr("parentId"), href: $(this).attr("href"), childnodes: [] };

                if (tree_datastructure.length == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function ConvertHierarchyXmlToTreeObject() {
            $($settings.dataset).find("node").each(function (key, value) {
                var node = { id: $(this).attr("id"), name: $(this).attr("name"), parentId: $(this).parent().attr("id") == null ? 0 : $(this).parent().attr("id"), href: $(this).attr("href"), childnodes: [] };

                if (tree_datastructure.length == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function AddNodeToTreeDataStructure(nodes, childnode) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == childnode.parentId) {
                    if (nodes[i].childnodes.length == 0) {
                        nodes[i].childnodes = [];
                    }

                    nodes[i].childnodes.push(childnode);
                    break;
                }
                else if (nodes[i].childnodes instanceof Object) {
                    AddNodeToTreeDataStructure(nodes[i].childnodes, childnode);
                }
            }
        }

        function BuildTree() {
            AddNodeToDisplayTree(tree_datastructure);
            $("#" + $settings.containerid).append(displaytree);

            var root_node = $("#" + $settings.containerid + "> ul > li > span:nth-child(1)");
            ToggleCaratIcon(root_node);
            CollapseTree(root_node);

            if ($settings.collapse_tree) {
                ToggleCaratIcon(root_node);
                CollapseTree(root_node);
            }
        }

        function AddNodeToDisplayTree(nodes) {
            if (displaytree.length == 0) {
                displaytree += "<ul style='list-style-type:none;'>";
            }
            else {
                displaytree += "<ul style='list-style-type:none; display:none;'>";
            }

            $(nodes).each(function (key, value) {
                var carat_css = $settings.collapse_carat_class;
                var item_margin = 20;
                displaytree += "<li nodeid='" + this.id + "'>";
                if (this.childnodes != null && this.childnodes.length > 0) {
                    displaytree += "<span class='ui-icon ";
                    if ($settings.collapse_tree) {
                        displaytree += $settings.expand_carat_class;
                    }
                    else {
                        displaytree += $settings.collapse_carat_class;
                    }
                    displaytree += "' data-action='nav_items' style='position:absolute; margin-top:1px;'></span>";
                }
                else {
                    displaytree += "<span class='ui-icon " + $settings.item_carat_class + "' data-action='nav_item' style='position:absolute; margin-top:1px;'></span>";
                }
                if ($settings.show_node_add) {
                    item_margin += 20;
                    displaytree += "<span class='ui-icon " + $settings.add_node_class + "' data-action='add' style='position:absolute;  margin-top:1px;margin-left:20px;'></span>";
                }
                if ($settings.show_node_remove) {
                    item_margin += 20;
                    displaytree += "<span class='ui-icon " + $settings.remove_node_class + "' data-action='remove' style='position:absolute; margin-top:1px;margin-left:40px;'></span>";
                }
                if (this.href) {
                    displaytree += "<a href='" + this.href + "'>";
                }
                displaytree += "<span style='margin-left:" + item_margin + "px;' data-action='text'>" + this.name + "</span>";
                if (this.href) {
                    displaytree += "</a>";
                }
                displaytree += "</li>";

                if (this.childnodes != null && this.childnodes.length > 0) {
                    AddNodeToDisplayTree(this.childnodes);
                }
            });

            displaytree += "</ul>";
        }

        $("li").delegate("span[data-action='nav_items']", "click", function () {
            ToggleCaratIcon(this);
            CollapseTree(this);
        });

        $("li").delegate("span[data-action='text']", "click", function () {
            HighlightNode(this, true);
        });

        $("li").delegate("span[data-action='add']", "click", function () {
            HighlightNode(this, true);
        });

        $("li").delegate("span[data-action='remove']", "click", function () {
            HighlightNode(this, true);
            var confirm_remove = confirm($settings.node_remove_message);

            if (confirm_remove) {
                var remove_item_id = $(this).parent().attr("nodeid");
                RemoveNode.call(tree_datastructure, remove_item_id);
            }
            else {
                HighlightNode(this, false);
            }
        });

        function CollapseTree(selectednode) {
            $(selectednode).parent().next("ul").toggle();
        }

        function ToggleCaratIcon(selectednode) {
            if ($(selectednode).hasClass($settings.expand_carat_class)) {
                $(selectednode).removeClass($settings.expand_carat_class);
                $(selectednode).addClass($settings.collapse_carat_class);
            }
            else if ($(selectednode).hasClass($settings.collapse_carat_class)) {
                $(selectednode).removeClass($settings.collapse_carat_class);
                $(selectednode).addClass($settings.expand_carat_class);
            }
        }

        function HighlightNode(selectednode, flag) {
            $("#" + $settings.containerid + " ul li span[data-action='text']").removeClass($settings.node_highlight);

            if (flag) {
                $(selectednode).parent().find("span[data-action='text']").addClass($settings.node_highlight);
            }
        }

        function RemoveNode(nodes, nodeid) {
            $(nodes).each(function (key, value) {
                if (this.id == nodeid) {
                    nodes.splice(this, 1);
                    return false;
                }
                else if (this.childnodes.length > 0) {
                    AddNodeToDisplayTree(this.childnodes);
                }
            });
        }
    };
})(jQuery);