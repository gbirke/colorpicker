/**
 * Called by picker buttons to insert Text and close the picker again
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 * @author Gabriel Birke <birke@d-scribe.de>
 */
function colorPickerInsert(pickerid,text,edid){
    insertTags(edid,'<color '+text+'>', '</color>', '');
    pickerClose();
}

/**
 * Creates a picker window for inserting color tags
 *
 * The given list can be an associative array with text,icon pairs
 * or a simple list of text. Style the picker window through the picker
 * class or the picker buttons with the pickerbutton class. Picker
 * windows are appended to the body and created invisible.
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 * @author Gabriel Birke <birke@d-scribe.de>
 */
function createColorPicker(id,list,icobase,edid){
  
  function getInsertHandler(colorCombination) {
    return function(){  
          colorPickerInsert(id, colorCombination, edid);
    };
  }
  
    var picker               = document.createElement('div');
    picker.className         = 'picker';
    picker.id                = id;
    picker.style.position    = 'absolute';
    picker.style.marginLeft  = '-10000px';

    for(var key in list){
      if (list.hasOwnProperty(key)) { 
        var btn = document.createElement('button');
        btn.className = 'pickerbutton';
        var colorspan = document.createElement('span');
        var fgbg = list[key].split('/');
        var colorCombination = list[key];
        colorspan.style.color = fgbg[0];
        colorspan.style.backgroundColor = fgbg[1]?fgbg[1]:'#ffffff';
        var txt = document.createTextNode(LANG.plugins.colorpicker.buttontext);
        colorspan.appendChild(txt);
        btn.title     = key;
        btn.appendChild(colorspan);
        addEvent(btn,'click', getInsertHandler(list[key]));
        picker.appendChild(btn);
      }
    }
    var body = document.getElementsByTagName('body')[0];
    body.appendChild(picker);
    return picker;
}


/**
 * Add button action for picker buttons and create picker element
 *
 * @param  DOMElement btn   Button element to add the action to 
 * @param  array      props Associative array of button properties
 * @param  string     edid  ID of the editor textarea
 * @param  int        id    Unique number of the picker
 * @return boolean    If button should be appended
 * @author Gabriel Birke <birke@d-scribe.de>
 */
function addBtnActionColorpicker(btn, props, edid, id)
{
    var pickerid = 'picker'+(pickercounter++);
    createColorPicker(pickerid,
         props.list,
         props.icobase,
         edid);
    addEvent(btn,'click',function(){
        pickerToggle(pickerid, btn);
        return false;
    });
    return true;
}



