//самый замороченный способ:

var doc = app.activeDocument;
var docName = doc.name;
docName = docName.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
var saveName = new File(decodeURI(doc.path)+'/'+docName[1]+'.jpg');
saveJPEG( app.activeDocument, saveName, 10 );



//вариант простейший:
var doc = app.activeDocument;

var saveOptions = new JPEGSaveOptions();
saveOptions.embedColorProfile = true;
saveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
saveOptions.matte = MatteType.NONE;
saveOptions.quality = 11;

var docName = doc.name.replace(/\.[^\.]+$/, '');
var jpegName = decodeURI(doc.path) + "/" + docName + ".jpg";
var saveName = new File(jpegName);
doc.saveAs(saveName, saveOptions, true, Extension.LOWERCASE);



//получение имени файла в развернутом виде
//[0] - это полное имя файла; [1] - это имя файла; [2] - это расширение файла
function GetFileName(objDoc)
{
    var fname = objDoc.name.match(/(.*)(\.[^\.]+)/) ? docName = docName.match(/(.*)(\.[^\.]+)/):docName = [docName, docName];
    return fname; 
}
