var express = require('express');
var router = express.Router();
var multer = require('multer');
var XLSX = require('xlsx');
var process = require('process');
var path = require('path');

var upload = multer({ //multer settings
    storage: null,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');
router.get("/", function(req, res) {
    var workbook = XLSX.readFile(path.join('public/Master.xlsx'));
    var sheet_name_list = workbook.SheetNames;
    var combineSheets = [];
    for(var i = 0; i < sheet_name_list.length;i++){
        console.log(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]));
        // var data = { sheet_name_list : XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]) }
        combineSheets.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[i]]));
    }
    res.send({statuscode: 200, data:combineSheets, sheetName: sheet_name_list});
    // console.log(combineSheets);

    // var exceltojson;
    // upload(req,res,function(err){
    //     if(err){
    //         res.json({error_code:1,err_desc:err});
    //         return;
    //     }
    //     /** Multer gives us file info in req.file object */
    //     if(!req.file){
    //         res.json({error_code:1,err_desc:"No file passed"});
    //         return;
    //     }
    //     console.log(req.file.path);
    //     // try {
    //     //     exceltojson({
    //     //         input: req.file.path,
    //     //         output: null, //since we don't need output.json
    //     //         lowerCaseHeaders:true,
    //     //         sheet: "all"
    //     //     }, function(err,result){
    //     //         if(err) {
    //     //             return res.json({error_code:1,err_desc:err, data: null});
    //     //         }
    //     //         res.json({error_code:0,err_desc:null, data: result});
    //     //     });
    //     // } catch (e){
    //     //     res.json({error_code:1,err_desc:"Corupted excel file"});
    //     // }
    // })
});
router.post("/", function(req, res) {
        console.log(res.body);
    XLSX.writeFile(req.body, path.join('public/Master12.xlsx'));
    // res.send(res);
});
module.exports = router;