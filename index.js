var fs=require('fs');
var express=require('express');
var path=require('path');

var app=express();

var port = process.env.PORT || 4000;
app.listen(port,()=>console.log('server running at:\n http://localhost:'+port));

//static
var uploadFolderPath=path.join(__dirname,'uploads');
console.log('1: '+uploadFolderPath);
app.use('/static',express.static(uploadFolderPath));



//default page load
app.get('/',(req,res)=>{
    res.redirect('/getImg');
});

app.get('/getImg',(req,res)=>{
    let Img=getImagesFromDir(uploadFolderPath);
    res.render('index',{title:'',images:Img});
});

function getImagesFromDir(dirPath){
    let allImg=[];
    var files=fs.readdirSync(dirPath).map(fileName => {
        return path.join(dirPath, fileName)
      });
      console.log('files '+files);
      for(f in files){
        console.log(f+' : '+files[f]);
        var stat =fs.statSync(files[f]);
        if(stat && stat.isDirectory()){
            getImagesFromDir(files[f]);
        }else if(stat && stat.isFile() && ['.jpg','.png'].indexOf(path.extname(files[f]))!==-1) {
            //allImg.push('/static'+files[f]);
            allImg.push(files[f]);
        }
      }
      
    return allImg;
}
function asHTML(){
    `<img src=`
}

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');