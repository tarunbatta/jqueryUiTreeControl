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
        , class_node_collapse: "ui-icon-folder-collapsed"
        , class_node_expand: "ui-icon-folder-open"
        , class_node_item: "ui-icon-document"
        , collapse_tree: false
        , class_node_highlight: "ui-state-highlight"
        , class_node_add: "ui-icon-plusthick"
        , class_node_remove: "ui-icon-minusthick"
        , show_button_check: false
        , show_button_add: false
        , show_button_remove: false
        , node_remove_message: "Are you sure you want to remove this node?"
        , onstart: function () { }
        , onend: function () { }
        , onprocessingstart: function () { }
        , onprocessingcomplete: function () { }
        , onprocessingerror: function (xhr, ajaxOptions, thrownError) { }
        , onbeforedataconversion: function () { }
        , onafterdataconversion: function () { }
        , onrenderstart: function () { }
        , onrendercomplete: function () { }
        , onbeforenodeinsert: function (node) { }
        , onafternodeinsert: function (node) { }
        , onselectednode: function (node, sender) { }
        , onbeforeaddnode: function () { }
        , onafteraddnode: function () { }
        , onbeforeremovenode: function () { }
        , onafterremovenode: function () { }
        , onaddnode: function (node, sender) { }
        , onremovenode: function (id, node, sender) { }
        , onnodecheckselected: function (id, node, sender) { }
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

            $settings.onbeforedataconversion();
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
            $settings.onafterdataconversion();
        }

        function ConvertJsonLinearToTreeObject() {
            $($settings.dataset[0].root).each(function (key, value) {
                var node = {
                    id: this.id
                    , name: this.name
                    , parentid: this.parentid
                    , href: this.href
                    , target: this.target
                    , buttoncheck: this.buttoncheck
                    , buttonadd: this.buttonadd
                    , buttonremove: this.buttonremove
                    , isdisabled: this.isdisabled
                    , classnodeicon: this.classnodeicon
                    , childnodes: []
                };

                if (tree_datastructure.length == 0 || node.parentid == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function ConvertLinearXmlToTreeObject() {
            $($settings.dataset).find("node").each(function (key, value) {
                var node = {
                    id: $(this).attr("id")
                    , name: $(this).attr("name")
                    , parentid: $(this).attr("parentid")
                    , href: $(this).attr("href")
                    , target: $(this).attr("target")
                    , buttoncheck: $(this).attr("buttoncheck") == null ? false : $(this).attr("buttoncheck")
                    , buttonadd: $(this).attr("buttonadd") == null ? false : $(this).attr("buttonadd")
                    , buttonremove: $(this).attr("buttonremove") == null ? false : $(this).attr("buttonremove")
                    , isdisabled: $(this).attr("isdisabled") == null ? false : $(this).attr("isdisabled")
                    , classnodeicon: $(this).attr("classnodeicon")
                    , childnodes: []
                };

                if (tree_datastructure.length == 0 || node.parentid == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function ConvertHierarchyXmlToTreeObject() {
            $($settings.dataset).find("node").each(function (key, value) {
                var node = {
                    id: $(this).attr("id")
                    , name: $(this).attr("name")
                    , parentid: $(this).parent().attr("id") == null ? 0 : $(this).parent().attr("id")
                    , href: $(this).attr("href")
                    , target: $(this).attr("target")
                    , buttoncheck: $(this).attr("buttoncheck") == null ? false : $(this).attr("buttoncheck")
                    , buttonadd: $(this).attr("buttonadd") == null ? false : $(this).attr("buttonadd")
                    , buttonremove: $(this).attr("buttonremove") == null ? false : $(this).attr("buttonremove")
                    , isdisabled: $(this).attr("isdisabled") == null ? false : $(this).attr("isdisabled")
                    , classnodeicon: $(this).attr("classnodeicon")
                    , childnodes: []
                };

                if (tree_datastructure.length == 0 || node.parentid == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function AddNodeToTreeDataStructure(nodes, childnode) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].id == childnode.parentid) {
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

            var root_nodes = $("#" + $settings.containerid + "> ul > li > span:nth-child(1)");
            ToggleCaratIcon(root_nodes);
            CollapseTree(root_nodes);

            if ($settings.collapse_tree) {
                ToggleCaratIcon(root_nodes);
                CollapseTree(root_nodes);
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
                var carat_css = $settings.class_node_collapse;

                $settings.onbeforenodeinsert(value);
                displaytree += CreateNode(this);
                $settings.onafternodeinsert(value);

                if (this.childnodes != null && this.childnodes.length > 0) {
                    AddNodeToDisplayTree(this.childnodes);
                }
            });

            displaytree += "</ul>";
        }

        function CreateNode(node) {
            var displaytree = "";
            var item_margin = 20;

            displaytree += "<li nodeid='" + node.id + "'>";
            displaytree += "<span class='ui-icon ";

            if (node.classnodeicon != null && node.classnodeicon.length > 0) {
                displaytree += node.classnodeicon;
            }
            else {
                if (node.childnodes != null && node.childnodes.length > 0) {
                    if ($settings.collapse_tree) {
                        displaytree += $settings.class_node_expand;
                    }
                    else {
                        displaytree += $settings.class_node_collapse;
                    }
                }
                else {
                    displaytree += $settings.class_node_item;
                }
            }
            displaytree += "' data-action='nav_items' style='position:absolute; margin-top:1px;'></span>";

            if (node.buttoncheck || (node.buttoncheck == null && $settings.show_button_check)) {
                displaytree += "<input type='checkbox' style='position:absolute; margin-top:1px;margin-left:" + item_margin + "px;'";
                if (node.isdisabled) {
                    displaytree += " disabled='true'";
                }
                displaytree += "></input>";
                item_margin += 20;
            }

            if (node.buttonadd || (node.buttonadd == null && $settings.show_button_add)) {
                displaytree += "<span class='ui-icon " + $settings.class_node_add + "' data-action='add' style='position:absolute; margin-top:1px;margin-left:" + item_margin + "px;'></span>";
                item_margin += 20;
            }

            if (node.buttonremove || (node.buttonremove == null && $settings.show_button_remove)) {
                displaytree += "<span class='ui-icon " + $settings.class_node_remove + "' data-action='remove' style='position:absolute; margin-top:1px;margin-left:" + item_margin + "px;'></span>";
                item_margin += 20;
            }

            if (node.href) {
                displaytree += "<a href='" + node.href + "' target='" + node.target + "'>";
            }
            displaytree += "<span style='margin-left:" + item_margin + "px;' data-action='text'>" + node.name + "</span>";
            if (node.href) {
                displaytree += "</a>";
            }
            displaytree += "</li>";

            return displaytree;
        }

        $("li span[data-action='nav_items']").bind("click", function () {
            ToggleCaratIcon(this);
            CollapseTree(this);
        });

        $("li span[data-action='text']").bind("click", function (e) {
            $settings.onselectednode($(this).parent().attr("nodeid"), e);
            HighlightNode(this, true);
        });

        $("li input[type='checkbox']").bind("click", function (e) {
            $settings.onnodecheckselected($(this).parent("li").attr("nodeid"), $(this).parent("li"), e);
            SelectChildCheckBox(this, $(this).is(":checked"));
        });

        $("li span[data-action='add']").bind("click", function (e) {
            $settings.onbeforeaddnode();
            HighlightNode(this, true);
            $settings.onaddnode($(this).parent("li"), e);
            $settings.onafteraddnode();
        });

        $("li span[data-action='remove']").bind("click", function (e) {
            $settings.onbeforeremovenode();
            HighlightNode(this, true);
            var confirm_remove = confirm($settings.node_remove_message);

            if (confirm_remove) {
                $settings.onremovenode($(this).parent("li").attr("nodeid"), $(this).parent("li"), e);
            }
            else {
                HighlightNode(this, false);
            }
            $settings.onafterremovenode();
        });

        function CollapseTree(selectednode) {
            $(selectednode).parent().next("ul").toggle();
        }

        function ToggleCaratIcon(selectednode) {
            $(selectednode).each(function () {
                if ($(this).hasClass($settings.class_node_expand)) {
                    $(this).removeClass($settings.class_node_expand);
                    $(this).addClass($settings.class_node_collapse);
                }
                else if ($(this).hasClass($settings.class_node_collapse)) {
                    $(this).removeClass($settings.class_node_collapse);
                    $(this).addClass($settings.class_node_expand);
                }
                else {
                    $.noop();
                }
            });
        }

        function HighlightNode(selectednode, flag) {
            $("#" + $settings.containerid + " ul li span[data-action='text']").removeClass($settings.class_node_highlight);

            if (flag) {
                $(selectednode).parent().find("span[data-action='text']").addClass($settings.class_node_highlight);
            }
        }

        function SelectChildCheckBox(selectednode, flag) {
            $(selectednode).parent("li").next("ul").find("input[type='checkbox']").each(function () {
                $(this).prop('checked', flag);
            });
        }
    };
})(jQuery);