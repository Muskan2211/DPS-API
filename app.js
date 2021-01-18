//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));



mongoose.connect("mongodb+srv://admin-muskan:"+process.env.PASSWORD+"@cluster0.bmbo9.mongodb.net/poemsubtitleDB", {useNewUrlParser: true, useUnifiedTopology: true} );
mongoose.set("useCreateIndex", true);


let today = new Date();
let options = {
  weekday:"long",
  month:"numeric",
  day:"numeric",
  year:"numeric"
};
let year=today.getFullYear();


app.get("/", function(req, res){
  res.render("informationpage", {yearmat:year});
});

// ---------------------------------------for /poem route get post and delete-------------------------
const poemSchema=new mongoose.Schema({
  title:String,
  poet:String,
  poem:String
});

const Poem = mongoose.model("Poem", poemSchema);

app.get("/poemhomer", function(req, res){
  res.render("poemhome", {yearmat:year});
});

app.get("/postpoemr", function(req, res){
  res.render("postpoem", {yearmat:year});
});

app.route("/poems")
.get( function(req, res){
  Poem.find(function(err, foundPoems){
    if(!err){
      res.send(foundPoems);
    }else{
      res.send(err);
    }
  });
})

.post(function(req, res){
  const newPoem = new Poem({
    title:req.body.title,
    poet:req.body.poet,
    poem:req.body.poem
  });
  newPoem.save(function(err){
    if(!err){
      res.send("Submitted Successfully");
    }else{
      res.send(err);
    }
  });
});

// .delete( function(req, res){
//   poem.deleteMany(function(err){
//     if(!err){
//       res.send("Successfully deleted all articles.")
//     }else{
//       res.send(err);
//     }
//   });
// });

// ----for particular article  get put patch and delete-------------------------------

app.route("/poems/:poemTitle")

.get(function(req, res){

  Poem.findOne({title:req.params.poemTitle}, function(err, foundpoem){
    if(foundpoem){
      res.send(foundpoem);
    }else{
      res.send("No article found");
    }
  });
});
// .delete(function(req, res){
//   Poem.deleteOne(
//     {title:req.params.poemTitle},
//     function(err){
//       if(!err){
//         res.send("Successfully deleted");
//       }else{
//         res.send(err);
//       }
//     }
//   );
// });

// .put(function(req, res){
//   Poem.updateOne(
//     {title:req.params.poemTitle},
//     {title:req.body.title, poet:req.body.poet, poem:req.body.poem},
//     {overwrite:true},
//     function(err, result){
//       if(!err){
//         res.send("Successfully updatesd");
//       }else{
//         res.send(err);
//       }
//     }
//   );
// })

// .patch(function(req, res){
//   Poem.updateOne(
//     {title:req.params.poemTitle},
//     {$set:req.body},  //req.body is obect and it contain the key and value of data we have entered
//     function(err, result){
//       if(!err){
//         res.send("Successfully updated");
//       }else{
//         res.send(err);
//       }
//     }
//   );
// })


// ---------------------------------------for movie famous dialogue route get post and delete-------------------------
const dialogueSchema=new mongoose.Schema({
  name:String,
  script:String,
  actor:String
});

const Dialogue = mongoose.model("Dialogue", dialogueSchema);

app.get("/dialoguehomer", function(req, res){
  res.render("dialoguehome", {yearmat:year});
});

app.get("/postdialoguer", function(req, res){
  res.render("postdialogue", {yearmat:year});
});

app.route("/dialogue")
.get( function(req, res){
  Dialogue.find(function(err, foundDialogue){
    if(!err){
      res.send( foundDialogue);
    }else{
      res.send(err);
    }
  });
})

.post(function(req, res){
  const newDialogue = new Dialogue({
    name:req.body.name,
    script:req.body.script,
    actor:req.body.actor
  });
  newDialogue.save(function(err){
    if(!err){
      res.send("Submitted Successfully");
    }else{
      res.send(err);
    }
  });
});

// ----for particular movie/series  get put patch and delete-------------------

app.route("/dialogue/:movieTitle")

.get(function(req, res){

  Dialogue.findOne({name:req.params.movieTitle}, function(err, founddialogue){
    if(founddialogue){
      res.send(founddialogue);
    }else{
      res.send("No article found");
    }
  });
});

// ---------------------------------------for short Story- route get post and delete----------------------------------
const storySchema=new mongoose.Schema({
  title:String,
  author:String,
  story:String
});

const Story = mongoose.model("Story", storySchema);

app.get("/storyhomer", function(req, res){
  res.render("storyhome", {yearmat:year});
});

app.get("/poststoryr", function(req, res){
  res.render("poststory", {yearmat:year});
});

app.route("/story")
.get( function(req, res){
  Story.find(function(err, foundStory){
    if(!err){
      res.send(foundStory);
    }else{
      res.send(err);
    }
  });
})

.post(function(req, res){
  const newStory = new Story({
    title:req.body.title,
    author:req.body.author,
    story:req.body.story
  });
  newStory.save(function(err){
    if(!err){
      res.send("Submitted Successfully");
    }else{
      res.send(err);
    }
  });
});

// ----for particular story  get put patch and delete-------------------

app.route("/story/:storyTitle")

.get(function(req, res){

  Story.findOne({title:req.params.storyTitle}, function(err, foundstory){
    if( foundstory){
      res.send( foundstory);
    }else{
      res.send("No article found");
    }
  });
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (){
  console.log("server started on port 3000");
});
