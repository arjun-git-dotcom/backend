const express= require ("express");

const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const personData=[];

port=3000;

app.listen(port,()=>{console.log(`successfully connected to ${port}`)})


//POST
app.post('/api/add_person',(req,res)=>{
    console.log('Result',req.body);
    const data={'id':personData.length+1,
        'name':req.body.name,
        'age':req.body.age,
        'phone':req.body.phone
    }

    personData.push(data);
    console.log('FINAL RESULT',data);

    res.status(201).send({"status_code":200,'Message':"Person data is added successfully",'person':data});
})

//GET

app.get("/api/get_person",(req,res)=>{
if(personData.length>0){
    res.status(200).send({'status_code':200,'person':personData})
}
else{
    res.status(200).send({'status_code':200,'person':[]})
}
}




);

app.delete("/api/delete_person/:id", (req, res) => {
    
    const id = parseInt(req.params.id, 10);


   
    const personIndex = personData.findIndex(person => person.id === id);

    if (personIndex !== -1) {
        const deletedperson = personData.splice(personIndex, 1);

        console.log('FINAL RESULT', deletedperson);
        console.log(res.statusCode)


       
        res.status(200).send({
            "status": "success",
            "Message": "person data has been deleted successfully",
            "person": deletedperson[0]
        });
    }
    else {
        res.status(404).send({
            "status_code": 404,
            "Message": "person not found"
        });
    }}
);
app.put("/api/update_person/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); 

    
    const personIndex = personData.findIndex(person=> person.id === id);

    if (personIndex !== -1) {
       
        const updatedperson = {
            id: req.body.id,
            name: req.body.name || personData[personIndex].name, 
            age: req.body.age || personData[personIndex].age,   
        };

        
        personData[personIndex] = updatedperson;

        res.status(200).send({
            "status": "success",
            "message": "person data has been updated successfully",
            "person": updatedperson
        });
    } else {
        res.status(404).send({
            "status": "error",
            "message": "person not found"
        });
    }
});


