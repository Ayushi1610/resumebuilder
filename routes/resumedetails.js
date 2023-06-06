var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')
router.post('/insertpersonaldetails', upload.single('photo'), function (req, res) {
  console.log("Body :", req.body);
  console.log("File :", req.file);
  pool.query("insert into personal_details(userid,fname,lname,pemail,mobile,designation,linkedin,address,objective,photo) values(?,?,?,?,?,?,?,?,?,?)", [req.body.user, req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.designation, req.body.linkedin, req.body.address, req.body.objective, req.file.originalname], function (error, result) {
    if (error) {
      console.log("Error:", error)
      res.render("personalDetails", { id: req.body.user })
    }
    else {
      res.render("education", { id: req.body.user })
    }
  })
})
router.post('/submitRequest', upload.single('design'), function (req, res) {
  console.log("Body :", req.body);
  console.log("File :", req.file);
  if(req.body.plan=='Choose Plan'){
    pool.query("select * from registration where userid=?",[req.body.user],function(error,result){
      if(error){throw error}
      else{
        res.render("contributorPlans",{result:result[0],message1:"Please choose the plan and then fill the request form!",message:null})
      }
    })
  }
  else{
    pool.query("insert into contribution_req(userid,fname,lname,mobile,email,plan,description,file) values(?,?,?,?,?,?,?,?) ",[req.body.user,req.body.fname,req.body.lname,req.body.mobile,req.body.email,req.body.plan,req.body.desc,req.file.originalname], function (error, result) {
      if (error) {
        console.log("Error:", error)
      }
      else {
        pool.query("select * from registration where userid=?",[req.body.user],function(error,result){
          if(error){throw error}
          else{
            res.render("contributorInterface",{result:result[0],message:"Request Submitted Successfully!"})
          }
        })
      }
    })
  }
 
})
router.post('/inserteducationdetails', function (req, res) {
  pool.query("insert into education(userid,ssc_passyear,ssc_per,hsc_passyear,hsc_per,hsc_spec,ug_passyear,ug_cgpa,ug_spec,pg_passyear,pg_cgpa,pg_spec) values(?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.user, req.body.sscyear, req.body.sscper, req.body.hscyear, req.body.hscper, req.body.hscspec, req.body.ugyear, req.body.ugper, req.body.ugspec, req.body.pgyear, req.body.pgper, req.body.pgspec], function (error, result) {
    if (error) {
      console.log("Error:", error)
      res.render("experience", { id: req.body.user })
    }
    else {
      res.render("experience", { id: req.body.user })
    }
  })
})
router.post('/insertexperiencedetails', function (req, res) {
  const data = [req.body];
  var len = 0;
  if (req.body.cname != null) { len = (req.body.cname).length }
  console.log(data)
  if (Array.isArray(req.body.cname)) {
    for (i = 0; i < len; i++) {
      company = req.body.cname[i];
      timeperiod = req.body.time[i];
      description = req.body.desc[i];
      console.log("multiple :", req.body.user, company, timeperiod, description)
      pool.query("insert into experience(userid,company,timeperiod,description) values(?,?,?,?)", [req.body.user, company, timeperiod, description], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("experience", { id: req.body.user })
        }
        else {
          res.render("skillsHobbies", { id: req.body.user })
        }
      })
    }
  }
  else {
    if (len != 0) {
      pool.query("insert into experience(userid,company,timeperiod,description) values(?,?,?,?)", [req.body.user, req.body.cname, req.body.time, req.body.desc], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("experience", { id: req.body.user })
        }
        else {
          res.render("skillsHobbies", { id: req.body.user })
        }
      })
    }
  }
})
router.post('/insertawarddetails', function (req, res) {
  const data = [req.body];
  var len = 0;
  if (req.body.validfrom != null) {
    len = (req.body.validfrom).length;
  }
  console.log(data)
  console.log('Length:', len);
  if (Array.isArray(req.body.validfrom)) {
    for (i = 0; i < len; i++) {
      if (req.body.validfrom[i].length != 0) {
        pool.query("insert into awards_achieve(userid,validfrom,validto,award_desc) values(?,?,?,?)", [req.body.user, req.body.validfrom[i], req.body.validto[i], req.body.award_desc[i]], function (error, result) {
          if (error) {
            console.log("Error:", error)
            res.render("awardsAchievements", { id: req.body.user })
          }
          else {
            res.render("languagesKnown", { id: req.body.user })
          }
        })
      }
    }
  }
  else {
    if (len != 0) {

      pool.query("insert into awards_achieve(userid,validfrom,validto,award_desc) values(?,?,?,?)", [req.body.user, req.body.validfrom, req.body.validto, req.body.award_desc], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("awadsAchievements", { id: req.body.user })
        }
        else {
          res.render("languagesKnown", { id: req.body.user })
        }
      })
    }
  }
})
router.post('/insertskillhobbydetails', function (req, res) {
  const data = [req.body];
  const skills = req.body.skills;
  const hobbies = req.body.hobbies;
  var len1 = 0, len2 = 0
  if (req.body.skills != null) { len1 = skills.length; }
  if (req.body.hobbies != null) { len2 = hobbies.length; }
  user = req.body.user;
  console.log(data)
  console.log(Array.isArray(skills), Array.isArray(hobbies))
  console.log('Length:', len1, len2);
  if (Array.isArray(skills)) {
    len1 = skills.length;

    for (i = 0; i < len1; i++) {
      pool.query("insert into skills(userid,skill) values(?,?)", [user, skills[i]], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("skillsHobbies", { id: req.body.user })
        }
        else {
          res.render("awardsAchievements", { id: req.body.user })
        }
      })
    }
  }
  else {
    if (len1 != 0) {
      pool.query("insert into skills(userid,skill) values(?,?)", [user, req.body.skills], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("skillsHobbies", { id: req.body.user })
        }
        else {
          res.render("awardsAchievements", { id: req.body.user })
        }
      })
    }
  }
  if (Array.isArray(hobbies)) {
    len2 = hobbies.length;
    for (i = 0; i < len2; i++) {
      pool.query("insert into hobbies(userid,hobbies) values(?,?)", [user, hobbies[i]], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("skillsHobbies", { id: req.body.user })
        }
        else {
          res.render("awardsAchievements", { id: req.body.user })
        }
      })
    }
  }
  else {
    if (len2 != 0) {
      pool.query("insert into hobbies(userid,hobbies) values(?,?)", [user, req.body.hobbies], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("skillsHobbies", { id: req.body.user })
        }
        else {
          res.render("awardsAchievements", { id: req.body.user })
        }
      })
    }
  }


})

router.post('/insertlanguagedetails', function (req, res) {
  const data = [req.body];
  var len = 0;
  if (req.body.languages != null) { len = (req.body.languages).length; }
  console.log(data)
  console.log('Length:', len);
  if (Array.isArray(req.body.languages)) {

    for (i = 0; i < len; i++) {
      if (req.body.languages[i].length != 0) {
        pool.query("insert into languages(userid,languages) values(?,?)", [req.body.user, req.body.languages[i]], function (error, result) {
          if (error) {
            console.log("Error:", error)
            res.render("languagesKnown", { id: req.body.user })
          }
          else {
            res.render("projects", { id: req.body.user })
          }
        })
      }
    }
  }
  else {
    if (len != 0) {
      pool.query("insert into languages(userid,languages) values(?,?)", [req.body.user, req.body.languages], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("languagesKnown", { id: req.body.user })
        }
        else {
          res.render("projects", { id: req.body.user })
        }
      })
    }
  }
})
router.post('/insertprojectdetails', function (req, res) {
  const data = [req.body];
  var len = 0;
  if (req.body.projectname != null) { len = (req.body.projectname).length; }
  console.log(data)
  console.log('Length:', len);
  if (Array.isArray(req.body.projectname)) {
    for (i = 0; i < len; i++) {
      if (req.body.projectname[i].length != 0) {
        pool.query("insert into project(userid,projectname,role,projectlink,projectdesc) values(?,?,?,?,?)", [req.body.user, req.body.projectname[i], req.body.type[i], req.body.projectlink[i], req.body.projectdesc[i]], function (error, result) {
          if (error) {
            console.log("Error:", error)
            res.render("projects", { id: req.body.user })
          }
          else {
            pool.query("select * from registration where userid=?",[req.body.user],function(error,result){
              if(error){throw error}
              else{
                res.render("UserInterface", { id: req.body.user,result:result[0],message:null,message1:null,templateid:null })
              }

            })
            
          }
        })
      }
    }
  }
  else {
    if (len != 0) {
      pool.query("insert into project(userid,projectname,role,projectlink,projectdesc) values(?,?,?,?,?)", [req.body.user, req.body.projectname, req.body.type, req.body.projectlink, req.body.projectdesc], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("projects", { id: req.body.user })
        }
        else {
          pool.query("select * from registration where userid=?",[req.body.user],function(error,result){
           if(error){
            throw error;
           }
           else{
            console.log(result)
            res.render("UserInterface", { id: req.body.user ,message:null,result:result[0],message1:null,templateid:null})
           }
          })
          
        }
      })

    }
  }
})
router.get('/userinterface', function (req, res) {
  res.render("UserInterface")
})

router.post('/dpersonalDetails', function (req, res) {
  pool.query("select * from personal_details where userid=?", [req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)
      if (result[0] == undefined) {
        pool.query("select * from education where userid=?", [req.body.userid], function (error, result1) {
          if (error) { throw error; }
          else {
            console.log(result1[0])
            if (result1[0] == undefined) {
              pool.query("select * from experience where userid=?", [req.body.userid], function (error, result2) {
                if (error) {
                  throw error;
                }
                else {
                  res.render("deleteExperience", { id: req.body.userid, result: result2 })
                }
              })
            }
            else {
              res.render("deleteEducation", { id: req.body.userid, result: result1[0] })
            }


          }
        })
      }
      else {
        res.render("deletePersonalDetails", { id: req.body.userid, result: result[0] })
      }
    }
  })
})
router.post('/skipPersonalDetails', function (req, res) {
  pool.query("select * from education where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result[0])
      if(result[0]==undefined){
        pool.query("select * from experience where userid=?",[req.body.user],function(error,result1){
            if(error){throw error}
            else{
              console.log(result1)
               res.render("deleteExperience",{id:req.body.user,result:result1})
            }
        })
      }
      else{
        res.render("deleteEducation", { id: req.body.user, result: result[0] })
      }
      
    }
  })
})
router.post('/skipEducation', function (req, res) {
  pool.query("select * from experience where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result)
      res.render("deleteExperience", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipExperience', function (req, res) {
  pool.query("select * from skills where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      pool.query("select * from hobbies where userid=?",[req.body.user],function(error,result2){
        if(error){throw error}
        else{
          console.log(result1,result2)
         res.render("deleteSkillsHobbies", { id: req.body.user, result1: result1,result2:result2 })
        } 
      }) 
    }
  })
})
router.post('/skipSkillsHobbies', function (req, res) {
  pool.query("select * from awards_achieve where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
        console.log(result)
         res.render("deleteAwards", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipAwards', function (req, res) {
  pool.query("select * from languages where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
        console.log(result)
         res.render("deleteLanguages", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipLanguages', function (req, res) {
  pool.query("select * from project where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
        console.log(result)
         res.render("deleteProjects", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipProjects', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
        console.log(result)
         res.render("UserInterface", { id: req.body.user, result: result[0],message:null,message1:null ,templateid:null})
    }
  })
})
router.post('/deletePersonalDetails', function (req, res) {
  pool.query("select * from education where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      pool.query("delete from personal_details where userid=?", [req.body.user], function (error, result2) {
        if (error) {
          throw error;
        }
        else {
          res.render("deleteEducation", { id: req.body.user, result: result1[0] });
        }
      })
    }
  })
})
router.post('/deleteEducation', function (req, res) {
  pool.query("select * from experience where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      console.log(req.body)
      pool.query("delete from education where userid=?", [req.body.user], function (error, result2) {
        if (error) {
          throw error;
        }
        else {
          console.log(result2)
          res.render("deleteExperience", { id: req.body.user, result: result1 });
        }
      })
    }
  })
})
router.post('/deleteExperience', function (req, res) {
  pool.query("select * from skills where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      pool.query("select * from hobbies where userid=?",[req.body.user],function(error,result2){
        if(error){throw error}
        else{
          console.log(req.body)
          pool.query("delete from experience where userid=?", [req.body.user], function (error, result3) {
            if (error) {
              throw error;
            }
            else {
              console.log(result2)
              res.render("deleteSkillsHobbies", { id: req.body.user, result1: result1,result2:result2 });
            }
          })

        }
      })
     
    }
  })
})
router.post('/deleteSkillsHobbies', function (req, res) {
  pool.query("select * from awards_achieve where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      pool.query("delete from skills where userid=?",[req.body.user],function(error,result2){
        if(error){throw error}
        else{
          console.log(req.body)
          pool.query("delete from hobbies where userid=?", [req.body.user], function (error, result3) {
            if (error) {
              throw error;
            }
            else {
              console.log(result1)
              res.render("deleteAwards", { id: req.body.user, result: result1});
            }
          })
        }
      })
    }
  })
})
router.post('/deleteAwards', function (req, res) {
  pool.query("select * from languages where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      console.log(req.body)
      pool.query("delete from awards_achieve where userid=?", [req.body.user], function (error, result2) {
        if (error) {
          throw error;
        }
        else {
          console.log(result2)
          res.render("deleteLanguages", { id: req.body.user, result: result1 });
        }
      })
    }
  })
})
router.post('/deleteLanguages', function (req, res) {
  pool.query("select * from project where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      console.log(req.body)
      pool.query("delete from languages where userid=?", [req.body.user], function (error, result2) {
        if (error) {
          throw error;
        }
        else {
          console.log(result2)
          res.render("deleteProjects", { id: req.body.user, result: result1 });
        }
      })
    }
  })
})
router.post('/deleteProjects', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      console.log(req.body)
      pool.query("delete from project where userid=?", [req.body.user], function (error, result2) {
        if (error) {
          throw error;
        }
        else {
          console.log(result1)
          res.render("UserInterface", { id: req.body.user, result: result1[0],message:null,message1:null,templateid:null });
        }
      })
    }
  })
})
router.post('/template1',function(req,res){
  console.log(req.body)
  pool.query("select * from registration where userid=?",[req.body.id],function(error,result){
    if(error){throw error}
    else{
      res.render('userInterface',{templateid:req.body.template,message:null,result:result[0],id:req.body.id,message1:"Template Choosed Successfully, now build resume!"})
    }
  })
  
})
router.post('/template2',function(req,res){
  console.log(req.body)
  pool.query("select * from registration where userid=?",[req.body.id],function(error,result){
    if(error){throw error}
    else{
      res.render('userInterface',{templateid:req.body.template,message:null,result:result[0],id:req.body.id,message1:"Template Choosed Successfully, now build resume!"})
    }
  })
  
})
router.post('/buildresume',function(req,res){
  console.log(req.body)
  pool.query("select * from personal_details natural join education natural join languages  where userid=?", [req.body.userid], function (error, result1) {
    if (error) {
      console.log("Error:", error)
      throw error;
    }
    else {
      console.log(result1[0])
      if(result1[0]==undefined){
        pool.query("select * from registration where userid=?",[req.body.userid],function(error,result){
          if(error){throw error}
          else{
            res.render("Userinterface",{result:result[0],id:req.body.userid,message:"Looks like you have'nt entered essential details like personal details, education or language details. Insert and move ahead.!",message1:null,templateid:null})
          }
        })
      }
      else{
        pool.query("select * from experience where userid=? ", [req.body.userid], function (error, result2) {
          if (error) { throw error; }
          else {
            pool.query("select * from skills where userid=?", [req.body.userid], function (error, result3) {
              if (error) { throw error }
              else {
                pool.query("select * from hobbies where userid=?", [req.body.userid], function (error, result4) {
                  if (error) { throw error }
                  else {
                    pool.query("select * from awards_achieve where userid=?", [req.body.userid], function (error, result5) {
                      if (error) { throw error }
                      else {
                        pool.query("select * from languages where userid=?", [req.body.userid], function (error, result6) {
                          if (error) { throw error }
                          else {
                            pool.query("select * from project where userid=?", [req.body.userid], function (error, result7) {
                              if (error) { throw error }
                              else {
                                pool.query("select * from experience where userid=?",[req.body.userid],function(error,result8){
                                  if(error){throw error}
                                  else{
                                    if(req.body.templateid==1){
                                      console.log(result1,result2,result3,result4,result5,result6,result7)
                                    res.render("template", {templateid:req.body.template, id: req.query.userid, result: result1[0], result1: result2, result2: result3, result3: result4, result4: result5, result5: result6, result6: result7,result7:result8 })

                                    }
                                    else if(req.body.templateid==2){
                                      console.log(result1,result2,result3,result4,result5,result6,result7)
                                    res.render("template2", { templateid:req.body.template,id: req.query.userid, result: result1[0], result1: result2, result2: result3, result3: result4, result4: result5, result5: result6, result6: result7,result7:result8 })
                                    }
                                    else{
                                      pool.query("select * from registration where userid=?",[req.body.userid],function(error,result){
                                        if(error){throw error}
                                        else{
                                          res.render("viewTemplate", {id: result[0].userid, result: result[0],message:"Choose template and then Build Resume"} )
                                        }
                                      })
                                    }

                                  }
                                })
                               
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        })

      }
      
    }
  })
})
module.exports = router;