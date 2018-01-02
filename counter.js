//requiring needed things

const fs = require('fs');

const yargs = require('yargs');

//declaring vars

//for directories
dirs = 0;

//for all files
files = 0;

//for file types
types = [];

//info of all the files

fileInfos = [];//{name:'',size:}

///////////////////////////////

//let's roll

yargs.command("count","Count All Files",{
    "path":{
        demand:true,
        describe:'Path',
        alias:'p'
    },
    "type":{
        describe:"Special Type",
        deman:false,
        alias:"t"
    }
}).help();

//let's get arguments

const args = yargs.argv;

const path = args.path;

const spType = args.type;

//let's proceed

switch(args._[0]){

    case "count"://if the command is count

       count(path,spType);//count files

       showTheResult(spType);///show the result

    break;

}



////////////////////////////////
/////                      /////
/////      Modules         /////
/////                      /////
////////////////////////////////

function count(path,special=''){

    var files = fs.readdirSync(path);

    // console.log(special!='');process.exit();

        debugger;
    
                    
                    //let's roll
        
                    for(let file of files){
        
                        //check if it has a type
        
                        if(file.split('.').length > 1){
        
                            //it has a type

                            if(special != '' && file.split('.')[1] != special){

                                //nothing should happen!!!

                            }else{
        
                            debugger;

                            //check if duplicate

                            if(checkIfDuplicate(file,fs.statSync(path+'/'+file).size)){
                                debugger;
                                dp = 1;
                            }else{

                                debugger;

                                addFile(file,fs.statSync(path+'/'+file).size);

                                dp = 0;
                            }
        
                            var newType = file.split('.')[1];
        
                            debugger;
        
                            let newTypes = types.filter((singleType)=>singleType.type==newType);
                            
                            if(newTypes.length!=0){
                            
                                types = types.map((singleType)=>{if(singleType.type == newType){singleType.count++;singleType.duplicate=dp+singleType.duplicate;};return singleType;});
                            debugger;
                            }else{
                            
                                types.push({type:newType,count:1,duplicate:dp});
                            
                            }

                            debugger;
                        }
        
                        }else if(fs.statSync(path+'/'+file).isDirectory()){
        
                            //it is a directory
        
                            dirs++;

                            debugger;
        
                            count(path+'/'+file,special);
        
                        }else{
        
                            //it is an unknown type file
                            if(special==''){//if user is not declared any special types

                                //check if duplicate

                                if(checkIfDuplicate(file,fs.statSync(path+'/'+file).size)){
                                    dp = 1;
                                }else{
    
                                    addFile(file,fs.statSync(path+'/'+file).size);
    
                                    dp = 0;
                                }


                                //adding
                            
                            let newTypes = types.filter((singleType)=>singleType.type=='Unknown');
        
                            if(newTypes.length!=0){
        
                                types = types.map((singleType)=>{if(singleType.type == 'Unknown'){singleType.count++;singleType.duplicate=dp+singleType.duplicate;};return singleType;});
        
                            }else{
        
                                types.push({type:"Unknown",count:1,duplicate:dp});
                                
                            }

                            

                        }
        
                        }
        
                    }
    
        
            


}

function showTheResult(spType=''){

    console.log("\n----------------\n");

    console.log(`The Num Of Directories Is:\t${dirs}\n`);

    console.log("----------------\n");

    if(spType != ''){

        debugger;

        console.log(`The Num Of ${spType}'s Is:\t${types[0].count}\tNum Of The Duplicated Ones: ${types[0].duplicate}\n\n`);

    }else{
        for(let key in types){

            console.log(`The Num Of ${types[key].type}'s Is:\t${types[key].count}\tNum Of The Duplicated Ones: ${types[key].duplicate}\n`);

        }
    }

}

function checkIfDuplicate(fileName,fileSize){

    let arr = fileInfos.filter((file)=>file.name == fileName && file.size == fileSize);

    if(arr.length >0){
        return true;
    }else{
        return false;
    }

}

function addFile(fileName,fileSize){

    fileInfos.push({name:fileName,size:fileSize});


}
// Code With Love By Pouya MozaffarMagham