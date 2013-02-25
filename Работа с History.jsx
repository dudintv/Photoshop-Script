//пример взять отсюда http://www.davidebarranca.com/2012/11/action-recordable-scripts-in-photoshop/

var lotOfCode = function() {
  // ... perform needed tasks
}
 
// suspendHistory()
// String: Label that will appear in the History panel
// String: commands to be executed
app.activeDocument.suspendHistory("Secret stuff happening...", "lotOfCode();" );


//
//
// Пример записываемого действия в истории фотошопа:
// пример показывает окно выбора радиуса блюра и блюрит
// 
//
 
#target photoshop
var Globals, ParamHolder, RecordableGB, rGB;
 
// store useful values here
Globals = {
  defaultRadius: 10,
  stringTitle: "Recordable Gaussian Blur",
};
 
// main object
RecordableGB = function() {
  var actualRoutine, win;
  win = null;
  this.CreateDialog = function() {
    // String containing info needed to build the ScriptUI window
    windowResource = "dialog { \
            valuePanel: Panel { \
                orientation: 'column', \
                alignChildren: ['fill', 'top'], \
                text: 'Radius', \
                valueText: EditText {}, \
                buttonsGroup: Group { \
                    cancelButton: Button {text: 'cancel', properties: {name: 'cancel'}}, \
                    okButton: Button {text: 'Ok', properties: {name: 'ok'}} \
                } \
            } \
        }"
    win = new Window(windowResource);
    // further formatting
    win.text = Globals.stringTitle;
    win.valuePanel.valueText.active = true;
    // button callbacks
    win.valuePanel.buttonsGroup.cancelButton.onClick = function() {
      return win.close();
    };
    win.valuePanel.buttonsGroup.okButton.onClick = function() {
      actualRoutine(Number(win.valuePanel.valueText.text));
      win.close();
    };
  };
  this.runDialog = function() {
    app.bringToFront();
    win.center();
    win.show();
  };
  // routine's core - just a Gaussian Blur as an example
  actualRoutine = function(radius) {
    return app.activeDocument.activeLayer.applyGaussianBlur(radius);
  };
};
 
// main program
rGB = new RecordableGB();
rGB.CreateDialog();
rGB.runDialog();


---------------------------------------------------------------------------------------------------------------------


