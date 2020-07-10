//Dependencies
var fs=require('fs');
var express=require('express');
var path=require('path');
var http=require('http');


var app=express();

//set the template engine
//app.set('view engine','ejs');
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


var port = process.env.PORT || 4000;
app.listen(port,()=>console.log('server running at:\n http://localhost:'+port));

//static
var uploadFolderPath=path.join(__dirname,'/uploads/');
console.log('1: '+uploadFolderPath);
app.use(express.static(uploadFolderPath));



//set public folder path
//  app.use(express.static(path.join(__dirname,'/public')));


//default page load
app.get('/',(req,res)=>{
    res.redirect('/getImg');
});

app.get('/getImg',(req,res)=>{
    let Img=getImagesFromDir(uploadFolderPath);
    res.render('gallery',{title:'PHOTO-GALLERY',images:Img});
});

function getImagesFromDir(dirPath){
    let allImg=[];
    var files=fs.readdirSync(dirPath).map(fileName => {
        return path.join(dirPath, fileName);
        //return fileName;
      });
      var myfiles=fs.readdirSync(dirPath).map(fileName => {
        //return path.join(dirPath, fileName);
        return fileName;
      });
      console.log('files '+myfiles);
      for(f in files){
        console.log(f+' : '+myfiles[f]);
        var stat =fs.statSync(files[f]);
        if(stat && stat.isDirectory()){
            getImagesFromDir(files[f]);
        }else if(stat && stat.isFile() && ['.jpg','.png'].indexOf(path.extname(files[f]))!==-1) {
            //allImg.push('/static'+files[f]);
            allImg.push(myfiles[f]);
        }
      }
      
    return allImg;
    asHTML(allImg);
}
function asHTML(allImg){
    `<img src=`+allImg[0]+`>`
}

