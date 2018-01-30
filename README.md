# jQuery-UI Tree Control

## Introduction

We all know that [jQuery-ui](http://jqueryui.com/) being a popular rendering framework supports only basic controls. Many of the controls that we use in web domain are still missing. Once such control is tree control and In order to expand the control set of jQuery-ui, this tree control is created which is compatible with jQuery-ui.

## Features

1. Supported on all jQuery compliant browsers.
1. Supported compliance with jQuery-ui.
1. Supports both JSON / XML data objects.
1. Supports data in both linear and hierarchy format.
1. Exposes various events for advance level programming.
1. Capability to change the icons. The programmer can change the collapse, expand, item, add, remove icons for the complete tree. The plugin also supports feature to change the icon at a specific node level.
1. Expand / Collapse tree.
1. Show / Hide buttons like add, remove and checkbox for a specific node or for complete tree. A custom message can also be specified in case of removing a  node.
1. Highlights the selected node with user specified class.
1. Disable checkbox with the node if present.
1. Exposed method to expand, collapse and toggle tree.
1. Exposed methods for add, remove and check select a node.
1. Enables checkbox selection and standardization.
1. Any checkbox can be selected via property in data object.
1. If a parent is selected, to which no child is selected, the parent will be auto unselected.
1. If a child is selected, then its immediate parents will be automatically selected.
1. Any custom attribute or property added to the dataSet will be added to the tree node for advance usage.

## Documentation

### Properties

| S.No | Property Name | Type | Description |
|---|---|---|---|
| 1 | containerid | string | The container div where the tree control needs to be populated |
| 2 | url | string | In case where the data source for the tree is either a external file / page / service, the url or path needs to be specified |
| 3 | async | boolean | Only in case where the url is specified, where the service call would be made |
| 4 | dataset | object (json / xml) | Should be specified only in case a local json/xml object is used to populate data in tree |
| 5 | datatype | enum | Specifies whether the type of data is either json or xml. Possible values are $treedatatype.Json and $treedatatype.Xml |
| 6 | dataformat | enum | Specifies the format of the data. Linear data should specify the parentId in the node, but the same is not required in Hierarchy as the parent-child relationship is already established. Possible values are $treedataformat.Linear and $treedataformat.Hierarchy |
| 7 | class_node_collapse | string | Class to be used for Collapse node. The jquery-ui icons can be referred from link |
| 8 | class_node_expand | string | Class to be used for Expand node. The jquery-ui icons can be referred from link |
| 9 | class_node_item | string | Class to be used for item node with no child. The jquery-ui icons can be referred fromlink |
| 10 | collapse_tree | boolean | Whether to collapse the complete tree |
| 11 | class_node_highlight | string | Class to be used for highlighting selected node |
| 12 | class_node_add | string | Class to be used for add node button. The jquery-ui icons can be referred from link |
| 13 | class_node_remove | string | Class to be used for remove node button. The jquery-ui icons can be referred from link |
| 14 | show_button_check | boolean | Whether to show checkbox for a node |
| 15 | show_node_add | boolean | Whether to show add button for a node |
| 16 | show_node_remove | boolean | Whether to show remove button for a node |
| 17 | node_remove_message | string | The confirm message to be displayed before deleting the node |

### Methods

| S.No | Method Name | Description |
|---|---|---|
| 1 | Expand | Expands the root node |
| 2 | Collapse | Collapse the root node |
| 3 | Toggle | Toggles the root node |

### Event Execution Life Cycle

1. onstart
1. onprocessingstart
1. onbeforedataconversion
1. onafterdataconversion
1. onprocessingcomplete
1. onrenderstart
1. onbeforenodeinsert
1. onafternodeinsert
1. onrendercomplete
1. onend

### Event Details

| S.No | Event Name | Signature | Description |
|---|---|---|---|
| 1 | onstart | function() | this event is fired on the start of the plugin |
| 2 | onprocessingstart | function() | this event is fired before the processing of data is to be started. At this stage the data is fetched from the source |
| 3 | onbeforedataconversion | function() | this event is fired before the data is converted into internal format |
| 4 | onafterdataconversion | function() | this event is fired after the data is converted into internal format |
| 5 | onprocessingcomplete | function() | this event is fired after the processing of data is complete |
| 6 | onrenderstart | function() | this event is fired at the start of the tree rendering |
| 7 | onbeforenodeinsert | function(node) | this event is fired before a node is inserted in the tree. The parameter “node” in this function is the node object to be added to the tree |
| 8 | onafternodeinsert | function(node) | this event is fired after a node is inserted in the tree. The parameter “node” in this function is the node object to be added to the tree |
| 9 | onrendercomplete | function() | this event is fired at the when rendering the tree is complete |
| 10 | onend | function() | this event is fired at the end of the plugin |
| 11 | onprocessingerror | function(xhr, ajaxOptions, thrownError) | this event is fired when an error has been encountered while fetching data for the tree. The parameter, “xhr” is the XmlHttpRequest object; and “ajaxOptions” is the ajax options object; and “thrownError” is the error object |
| 12 | onselectednode | function(id, node, sender) | this event is fired when a node is selected from the tree. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 13 | onbeforeaddnode | function(id, node, sender) | this event is fired before a node is added. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 14 | onafteraddnode | function(id, node, sender) | this event is fired after a node is added. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 15 | onbeforeremovenode | function(id, node, sender) | this event is fired before a node is removed. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 16 | onafterremovenode | function(id, node, sender) | this event is fired after a node is removed. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 17 | onaddnode | function(id, node, sender) | this event is fired when is node is to be added. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 18 | onremovenode | function(id, node, sender) | this event is fired when a node is to be removed. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |
| 19 | onnodecheckselected | function(id, node, sender) | this event is fired when checkbox for a node is selected. The parameter “id” is the unique identifier on the noe, “node” in this function is the selected node element in the tree and “sender” is the event object |

### Node Data Structure

| S.No | Attribute Name | Type | Description |
|---|---|---|---|
| 1 | id | int | The id of the node |
| 2 | name | string | This is the text of the node |
| 3 | parentid | int | This is the parent’s id to the node. In case of root node, this id will be 0. Note: This needs to be specified only in case of Hierarchy | data format |
| 4 | href | url | This is a url link on the node |
| 5 | target | string | In case using the url attribute , the target can be set for the url (example, “_blank”) |
| 6 | buttoncheck | boolean | Whether to show checkbox at node level. This property overrides the show_button_check property at plugin level |
| 7 | buttonadd | boolean | Whether to show add button at node level. This property overrides the show_button_add property at plugin level |
| 8 | buttonremove | boolean | Whether to show remove button at node level. This property overrides the show_button_remove property at plugin level |
| 9 | classnodeicon | string | Class to be specified for a node icon. This property overrides the class property at plugin level. The jquery-ui icons can be referred fromlink |
| 10 | isdisabled | boolean | Specifies whether to disable the checkbox. This attribute can only be used along with buttoncheck attribute |
| 11 | ischecked | boolean | Specifies whether to check/uncheck the checkbox. This attribute can only be used along with buttoncheck attribute |
| 12 | tooltip | string | Sets the tooltip for the node |

### Examples of input data to tree

#### Json - Linear

```js
{
    "root": [
        {
            "id": 1,
            "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "href": "http://google.com",
            "title": "test",
            "childnodes": [
                {
                    "id": 2,
                    "name": "Proin dignissim commodo elit, quis pretium metus volutpat at.",
                    "childnodes": [
                        {
                            "id": 4,
                            "name": "Morbi malesuada lorem dignissim sapien molestie varius.",
                            "childnodes": [
                                {
                                    "id": 6,
                                    "name": "In feugiat ante sit amet orci pulvinar sit amet vehicula enim ornare."
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Quisque tempor dui in magna ullamcorper ornare.",
                    "childnodes": [
                        {
                            "id": 5,
                            "name": "Integer et justo ac nunc viverra elementum vitae at eros."
                        }
                    ]
                },
                {
                    "id": 10,
                    "name": "Praesent venenatis ante iaculis enim semper iaculis.",
                    "childnodes": null
                }
            ]
        },
        {
            "id": 7,
            "name": "Cras at orci turpis, sed sodales velit.",
            "childnodes": [
                {
                    "id": 8,
                    "name": "Cras scelerisque urna vel mi condimentum ac feugiat libero iaculis."
                },
                {
                    "id": 9,
                    "name": "Ut pharetra sem non est facilisis iaculis."
                }
            ]
        }
    ]
}
```

#### JSON – Hierarchy

```js
{
    "root": [
        {
            "id": 1,
            "name": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "href": "http://google.com",
            "title": "test",
            "childnodes": [
                {
                    "id": 2,
                    "name": "Proin dignissim commodo elit, quis pretium metus volutpat at.",
                    "childnodes": [
                        {
                            "id": 4,
                            "name": "Morbi malesuada lorem dignissim sapien molestie varius.",
                            "childnodes": [
                                {
                                    "id": 6,
                                    "name": "In feugiat ante sit amet orci pulvinar sit amet vehicula enim ornare."
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": 3,
                    "name": "Quisque tempor dui in magna ullamcorper ornare.",
                    "childnodes": [
                        {
                            "id": 5,
                            "name": "Integer et justo ac nunc viverra elementum vitae at eros."
                        }
                    ]
                },
                {
                    "id": 10,
                    "name": "Praesent venenatis ante iaculis enim semper iaculis.",
                    "childnodes": null
                }
            ]
        },
        {
            "id": 7,
            "name": "Cras at orci turpis, sed sodales velit.",
            "childnodes": [
                {
                    "id": 8,
                    "name": "Cras scelerisque urna vel mi condimentum ac feugiat libero iaculis."
                },
                {
                    "id": 9,
                    "name": "Ut pharetra sem non est facilisis iaculis."
                }
            ]
        }
    ]
}
```

#### XML – Linear

```xml
<root>
  <node id='1' name='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' parentId='0' href='http://google.com' />
  <node id='2' name='Proin dignissim commodo elit, quis pretium metus volutpat at.' parentId='1' />
  <node id='3' name='Quisque tempor dui in magna ullamcorper ornare.' parentId='1' buttonadd='false'/>
  <node id='4' name='Morbi malesuada lorem dignissim sapien molestie varius.' parentId='2' buttonremove='false'/>
  <node id='5' name='Integer et justo ac nunc viverra elementum vitae at eros.' parentId='3' />
  <node id='6' name='In feugiat ante sit amet orci pulvinar sit amet vehicula enim ornare.' parentId='4' />
  <node id='7' name='Cras at orci turpis, sed sodales velit.' parentId='0' buttoncheck='true' buttonadd='false' buttonremove='false' classnodeicon='ui-icon-star' />
  <node id='8' name='Cras scelerisque urna vel mi condimentum ac feugiat libero iaculis.' parentId='7' href='https://github.com' target='_blank' />
  <node id='9' name='Ut pharetra sem non est facilisis iaculis.' parentId='7' buttoncheck='true' ischecked='false'/>
  <node id='10' name='Praesent venenatis ante iaculis enim semper iaculis.' parentId='1' buttoncheck='true' isdisabled='true' />
  <node id='11' name='Abra ka dabra.' parentId='9' buttoncheck='true' classnodeicon='ui-icon-lightbulb'/>
  <node id='12' name='Hakuna matata.' parentId='9' buttoncheck='true' classnodeicon='ui-icon-lightbulb' ischecked='true'/>
</root>
```

#### XML – Hierarchy

```xml
<root>
  <node id='1' name='Lorem ipsum dolor sit amet, consectetur adipiscing elit.' href='http://google.com' title='test'>
    <node id='2' name='Proin dignissim commodo elit, quis pretium metus volutpat at.'>
      <node id='4' name='Morbi malesuada lorem dignissim sapien molestie varius.'>
        <node id='6' name='In feugiat ante sit amet orci pulvinar sit amet vehicula enim ornare.'></node>
      </node>
    </node>
    <node id='3' name='Quisque tempor dui in magna ullamcorper ornare.'>
      <node id='5' name='Integer et justo ac nunc viverra elementum vitae at eros.'></node>
    </node>
    <node id='10' name='Praesent venenatis ante iaculis enim semper iaculis.'></node>
  </node>
  <node id='7' name='Cras at orci turpis, sed sodales velit.'>
    <node id='8' name='Cras scelerisque urna vel mi condimentum ac feugiat libero iaculis.'></node>
    <node id='9' name='Ut pharetra sem non est facilisis iaculis.'></node>
  </node>
</root>
```

## How to use

1. Run code from Github:
    1. Run “npm install”
    1. Run “bower install”
    1. Run “index.html”
1. Implement in your project:
    1. Run “bower install jqueryuitreecontrol”
    1. Add “bower_components/jqueryuitreecontrol/dist/jquery.techbytarun.jqueryuitreecontrol.js” to your page.