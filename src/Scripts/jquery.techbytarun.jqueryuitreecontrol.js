/*
 * jQuery UI Treeview Plugin Library
 * http://techbytarun.com/
 *
 * Copyright (c) 2013 Batta Tech Private Limited
 * Licensed under https://github.com/tarunbatta/jqueryUiTreeControl/blob/master/LICENSE.txt
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
        , onselectednode: function (id, node, sender) { }
        , onbeforeaddnode: function (id, node, sender) { }
        , onafteraddnode: function (id, node, sender) { }
        , onbeforeremovenode: function (id, node, sender) { }
        , onafterremovenode: function (id, node, sender) { }
        , onaddnode: function (id, node, sender) { }
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
                            ConvertJsonLinearToTreeObject($settings.dataset.root);
                            break;
                        case 2:
                            tree_datastructure = $settings.dataset.root;
                            break;
                    }
                    break;
                case 2:
                    switch ($settings.dataformat) {
                        case 1:
                            ConvertLinearXmlToTreeObject($settings.dataset);
                            break;
                        case 2:
                            ConvertHierarchyXmlToTreeObject($settings.dataset);
                            break;
                    }
                    break;
            }

            $settings.onafterdataconversion();
        }

        function GetNodeObjectFromJson(jsonnode) {
            var result;

            result = {
                id: jsonnode.id
                    , name: jsonnode.name
                    , parentId: jsonnode.parentId
                    , href: jsonnode.href
                    , target: jsonnode.target
                    , tooltip: jsonnode.tooltip
                    , buttoncheck: jsonnode.buttoncheck
                    , buttonadd: jsonnode.buttonadd
                    , buttonremove: jsonnode.buttonremove
                    , isdisabled: jsonnode.isdisabled
                    , ischecked: jsonnode.ischecked
                    , classnodeicon: jsonnode.classnodeicon
                    , childnodes: []
            };

            for (var propertyName in jsonnode) {
                if (!result.hasOwnProperty(propertyName))
                {
                    result[propertyName] = jsonnode[propertyName];
                }
            }

            return result;
        }

        function GetNodeObjectFromXml(xmlnode) {
            var result;
            var parentId = 0;

            if ($(xmlnode).parent().attr("id") != null) {
                parentId = $(xmlnode).parent().attr("id");
            }
            else if ($(xmlnode).attr("parentId") != null) {
                parentId = $(xmlnode).attr("parentId");
            }

            result = {
                id: $(xmlnode).attr("id")
                , name: $(xmlnode).attr("name")
                , parentId: parentId
                , href: $(xmlnode).attr("href")
                , target: $(xmlnode).attr("target")
                , tooltip: $(xmlnode).attr("tooltip")
                , buttoncheck: $(xmlnode).attr("buttoncheck") == null ? false : $(xmlnode).attr("buttoncheck")
                , buttonadd: $(xmlnode).attr("buttonadd") == null ? false : $(xmlnode).attr("buttonadd")
                , buttonremove: $(xmlnode).attr("buttonremove") == null ? false : $(xmlnode).attr("buttonremove")
                , isdisabled: $(xmlnode).attr("isdisabled") == null ? false : $(xmlnode).attr("isdisabled")
                , ischecked: $(xmlnode).attr("ischecked") == null ? false : $(xmlnode).attr("ischecked")
                , classnodeicon: $(xmlnode).attr("classnodeicon")
                , childnodes: []
            };

            $(xmlnode.attributes).each(function () {
                if (!result.hasOwnProperty(this.name)) {
                    result[this.name] = this.value;
                }
            });

            return result;
        }

        function ConvertJsonLinearToTreeObject(dataset) {
            $(dataset).each(function (key, value) {
                var node = GetNodeObjectFromJson(this);

                if (tree_datastructure.length == 0 || node.parentId == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function ConvertLinearXmlToTreeObject(dataset) {
            $(dataset).find("node").each(function (key, value) {
                var node = GetNodeObjectFromXml(this);

                if (tree_datastructure.length == 0 || node.parentId == 0) {
                    tree_datastructure.push(node);
                }
                else {
                    AddNodeToTreeDataStructure(tree_datastructure, node);
                }
            });
        }

        function ConvertHierarchyXmlToTreeObject(dataset) {
            $(dataset).find("node").each(function (key, value) {
                var node = GetNodeObjectFromXml(this);

                if (tree_datastructure.length == 0 || node.parentId == 0) {
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

            EnableRootCarats();
            StandardizeCheckSelection();
        }

        function EnableRootCarats() {
            var root_nodes = $.fn.btechcotree.GetRootNodes();
            $.fn.btechcotree.ToggleCaratIcon(root_nodes);
            $.fn.btechcotree.ToggleTree(root_nodes);

            if ($settings.collapse_tree) {
                $.fn.btechcotree.ToggleCaratIcon(root_nodes);
                $.fn.btechcotree.ToggleTree(root_nodes);
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
            var internalProperties = ["id", "name", "parentId", "href", "target", "tooltip", "buttoncheck", "buttonadd", "buttonremove", "isdisabled", "ischecked", "classnodeicon", "childnodes"];
            
            displaytree += "<li nodeid='" + node.id + "'";

            for (var propertyName in node) {
                if (internalProperties.indexOf(propertyName) < 0) {
                    displaytree += " " + propertyName + "='" + node[propertyName] + "'";
                }
            }

            displaytree += ">";
            displaytree += "<div>";
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

                if (node.ischecked == "true") {
                    displaytree += " checked='true' data-ischecked=" + node.ischecked;
                }
                else {
                    displaytree += " data-ischecked='false'";
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
            displaytree += "<span style='margin-left:" + item_margin + "px;' data-action='text'";
            if (node.tooltip != null) {
                displaytree += " title='" + node.tooltip + "'";
            }
            displaytree += ">" + node.name + "</span>";
            if (node.href) {
                displaytree += "</a>";
            }
            displaytree += "</div>";
            displaytree += "</li>";

            return displaytree;
        }

        $("li div span[data-action='nav_items']").bind("click", function () {
            $.fn.btechcotree.ToggleCaratIcon(this);
            $.fn.btechcotree.ToggleTree(this);
        });

        $("li div span[data-action='text']").bind("click", function (e) {
            $settings.onselectednode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
            HighlightNode(this, true);
        });

        $("li div input[type='checkbox']").bind("click", function (e) {
            $settings.onnodecheckselected($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
            SelectParentChildCheckBox(this, $(this).is(":checked"));
        });

        $("li div span[data-action='add']").bind("click", function (e) {
            $settings.onbeforeaddnode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
            HighlightNode(this, true);
            $settings.onaddnode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
            $settings.onafteraddnode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
        });

        $("li div span[data-action='remove']").bind("click", function (e) {
            $settings.onbeforeremovenode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
            HighlightNode(this, true);
            var confirm_remove = confirm($settings.node_remove_message);

            if (confirm_remove) {
                $settings.onremovenode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
            }
            else {
                HighlightNode(this, false);
            }
            $settings.onafterremovenode($(this).parent("div").parent("li").attr("nodeid"), $(this).parent("div").parent("li"), e);
        });

        function HighlightNode(selectednode, flag) {
            $("#" + $settings.containerid + " ul li div span[data-action='text']").removeClass($settings.class_node_highlight);

            if (flag) {
                $(selectednode).parent("div").parent("li").find("span[data-action='text']:first").addClass($settings.class_node_highlight);
            }
        }

        function SelectParentChildCheckBox(selectednode, flag) {
            // update status of current node
            SelectCheckbox(selectednode, flag);

            // selects all child checkboxes of selected node
            $(selectednode).parent("div").parent("li").next("ul").find("input[type='checkbox']").each(function () {
                SelectCheckbox(this, flag);
            });

            //select all parent checkboxes of selected node
            $(selectednode).parents("ul").prev("li").find("div input[type='checkbox']").each(function () {
                SelectCheckbox(this, flag);
            });
        }

        function SelectCheckbox(selectednode, flag) {
            if (flag) {
                $(selectednode).prop("checked", "true");
                $(selectednode).attr("data-ischecked", "true");
            }
            else {
                $(selectednode).removeAttr("checked");
                $(selectednode).attr("data-ischecked", "false");
            }
        }

        function StandardizeCheckSelection() {
            // de-selects all the nodes if they don't have any child node which is selected
            $("#" + $settings.containerid + " ul li div").find("input[type='checkbox']").each(function () {
                if ($(this).is(":checked") && $(this).attr("data-ischecked") && $(this).parent("div").parent("li").next("ul").children().find("input[type='checkbox']").length > 0) {
                    var isanychildselected = false;

                    $(this).parent("div").parent("li").next("ul").children().each(function () {
                        if ($(this).find("input[type='checkbox']").is(":checked") && $(this).find("input[type='checkbox']").attr("data-ischecked")) {
                            isanychildselected = true;
                        }
                    });

                    if (!isanychildselected) {
                        $(this).removeAttr("checked");
                        $(this).attr("data-ischecked", "false");
                    }
                }
            });

            // selects immediate parents of the selected node if not selected
            $("#" + $settings.containerid + " ul li div").find("input[type='checkbox'][checked='true']").each(function () {
                $(this).parents("ul").prev("li").each(function () {
                    $(this).find("input[type='checkbox']").attr("checked", "true");
                    $(this).find("input[type='checkbox']").attr("data-ischecked", "true");
                });
            });
        }
    };

    $.fn.btechcotree.GetRootNodes = function () {
        return $("#" + $settings.containerid + "> ul > li > div > span:nth-child(1)");
    };

    $.fn.btechcotree.ToggleTree = function (selectednode) {
        $(selectednode).parent("div").parent("li").next("ul").toggle();
    };

    $.fn.btechcotree.ToggleCaratIcon = function (selectednode) {
        $(selectednode).each(function () {
            if (!$(this).hasClass($settings.class_node_item)) {
                if ($(this).hasClass($settings.class_node_expand)) {
                    $(this).removeClass($settings.class_node_expand);
                    $(this).addClass($settings.class_node_collapse);
                }
                else if ($(this).hasClass($settings.class_node_collapse)) {
                    $(this).removeClass($settings.class_node_collapse);
                    $(this).addClass($settings.class_node_expand);
                }
                else {
                    $(this).addClass($settings.class_node_expand);
                }
            }
        });
    };

    $.fn.btechcotree.ExpandCollapseTree = function (selectednode, flag) {
        if (flag) {
            if (!$(selectednode).parent("div").parent("li").next("ul").is(":visible")) {
                $(selectednode).parent("div").parent("li").next("ul").show();
                $.fn.btechcotree.ToggleCaratIcon(selectednode);
            }
        }
        else {
            if ($(selectednode).parent("div").parent("li").next("ul").is(":visible")) {
                $(selectednode).parent("div").parent("li").next("ul").hide();
                $.fn.btechcotree.ToggleCaratIcon(selectednode);
            }
        }
    };

    $.fn.btechcotree.Expand = function () {
        var root_nodes = $.fn.btechcotree.GetRootNodes();
        $.fn.btechcotree.ExpandCollapseTree(root_nodes, true);
    };

    $.fn.btechcotree.Collapse = function () {
        var root_nodes = $.fn.btechcotree.GetRootNodes();
        $.fn.btechcotree.ExpandCollapseTree(root_nodes, false);
    };

    $.fn.btechcotree.Toggle = function () {
        var root_nodes = $.fn.btechcotree.GetRootNodes();
        $.fn.btechcotree.ToggleCaratIcon(root_nodes);
        $.fn.btechcotree.ToggleTree(root_nodes);
    };

})(jQuery);