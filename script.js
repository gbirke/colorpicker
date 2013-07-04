/**
 * Called by picker buttons to insert Text and close the picker again
 *
 * @author Andreas Gohr <andi@splitbrain.org>
 * @author Gabriel Birke <gb@birke-software.de>
 */
function colorPickerInsert(text, edid){
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
 * @author Gabriel Birke <gb@birke-software.de>
 */
function createColorPicker(id,list,icobase,edid){
  
  function getInsertHandler(colorCombination) {
    return function(){  
          colorPickerInsert(colorCombination, edid);
    };
  }
  
    var $picker              = jQuery('<div class="picker" id="' + id + '"></div>');
    $picker.css({position:'absolute', 'marginLeft': '-10000px'});

    for(var key in list){
      if (list.hasOwnProperty(key)) { 
        var $btn = jQuery('<button class="pickerbutton" title="' + key + '"/>'),
            colorspan = jQuery('<span>' + LANG.plugins.colorpicker.buttontext + '</span>'),
            fgbg = list[key].split('/'),
            colorCombination = list[key];
        colorspan.css({
            color:fgbg[0],
            backgroundColor: fgbg[1] ? fgbg[1] : '#ffffff'
        });
        
        $btn.append(colorspan);
        $btn.click(getInsertHandler(list[key]));
        $picker.append($btn);
      }
    }
    jQuery('body').append($picker);
    return $picker;
}


/**
 * Add button action for picker buttons and create picker element
 *
 * @param  DOMElement btn   Button element to add the action to 
 * @param  array      props Associative array of button properties
 * @param  string     edid  ID of the editor textarea
 * @return boolean    If button should be appended
 * @author Gabriel Birke <gb@birke-software.de>
 */
function addBtnActionColorpicker($btn, props, edid)
{
    var pickerid = 'picker'+(pickercounter++);
    createColorPicker(pickerid,
         props.list,
         props.icobase,
         edid);
    $btn.click(function(){
        pickerToggle(pickerid, $btn);
        return false;
    });

    return true;
}



