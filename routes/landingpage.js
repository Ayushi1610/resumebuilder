var express = require('express');
var router = express.Router();
var pool = require('./pool')
const Swal = require('sweetalert2')
router.get('/Home', function (req, res) {
  res.render("LandingPage", { result: 2, message: null, message1: null })
})
router.post('/insertqueryinfo', function (req, res) {
  var name = req.body.fname + " " + req.body.lname
  pool.query("insert into contactus(name,mobileno,email,review) values(?,?,?,?)", [name, req.body.number, req.body.mail, req.body.Content], function (error, result) {
    if (error) {
      console.log("Error:", error)
      res.render("LandingPage", { result: 3, message: null, message1: null })
    }
    else {
      res.render("LandingPage", { result: 1, message: null, message1: null })
    }
  })
})
router.get('/register', function (req, res) {
  res.render("Registration", { message: null })
})
router.post('/insertregisterinfo', function (req, res) {
  pool.query("select * from registration where email=? or password=?", [req.body.mail, req.body.password], function (error, result) {
    if (result.length > 0) {
      console.log("Already Registered")
      res.render("LandingPage", { message: "Already Registered", message1: null })
    }
    else {
      var date = new Date();
      pool.query("insert into registration(name,email,password,type,date) values(?,?,?,?,?)", [req.body.name, req.body.mail, req.body.password, req.body.type, date], function (error, result) {
        if (error) {
          console.log("Error:", error)
          res.render("LandingPage", { message: null, message1: null })
        }
        else {
          res.render("LandingPage", { message: null, message1: null })
        }
      })

    }
  })

})
router.post('/userlogin', function (req, res) {
  pool.query("select * from registration where email=? and password=?", [req.body.email, req.body.password], function (error, result) {
    if (error) {
      console.log("Error:", error)
      res.render("LandingPage", { message: null, message1: null })
    }
    else {
      if (result.length == 0) {
        console.log("Invalid Email/Password")
        res.render('LandingPage', { message: null, message1: 'Invalid Email/Password' })
      }
      else {
        console.log("Login Successfully")
        console.log(result[0].type)
        if (result[0].type == 'user') {
          res.render("UserInterface", { id: result[0].userid, result: result[0], message: null, message1: null, templateid: null })
        }
        else if (result[0].type == 'contributor') {
          res.render("contributorInterface", { result: result[0], message: null })
        }
      }
    }
  })
})
router.post('/adminlogin', function (req, res) {
  pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apassword], function (error, result) {
    console.log(req.body)
    if (error) { throw error }
    else {
      pool.query("select count(*) as count1 from registration where type='user'", function (error, result1) {
        if (error) { throw error }
        else {
          pool.query("select count(*) as count2 from registration where type='contributor'", function (error, result2) {
            if (error) { throw error }
            else {
              pool.query("select count(*) as count3 from templateinfo", function (error, result3) {
                if (error) { throw error }
                else {
                  var month = new Date().getMonth() + 1;
                  console.log(month)
                  pool.query("select count(*) as count4 from registration where month(date)=? and type='user'", [month], function (error, result4) {
                    if (error) { throw error }
                    else {
                      pool.query("select count(*) as count5 from registration where month(date)=? and type='contributor'", [month], function (error, result5) {
                        if (error) { throw error }
                        else {
                          pool.query("select * from registration where type='user'", function (error, result6) {
                            if (error) { throw error }
                            else {
                              pool.query("select * from registration where type='contributor'", function (error, result7) {
                                if (error) { throw error }
                                else {
                                  pool.query("select * from personal_details", function (error, result8) {
                                    if (error) { throw error }
                                    else {
                                      pool.query("select * from education", function (error, result9) {
                                        if (error) { throw error }
                                        else {
                                          pool.query("select * from awards_achieve", function (error, result10) {
                                            if (error) { throw error }
                                            else {
                                              pool.query("select * from experience", function (error, result11) {
                                                if (error) { throw error }
                                                else {
                                                  pool.query("select * from project", function (error, result12) {
                                                    if (error) { throw error }
                                                    else {
                                                      pool.query("select * from skills", function (error, result13) {
                                                        if (error) { throw error }
                                                        else {
                                                          pool.query("select * from hobbies", function (error, result14) {
                                                            if (error) { throw error }
                                                            else {
                                                              pool.query("select * from languages", function (error, result15) {
                                                                if (error) { throw error }
                                                                else {
                                                                  pool.query("select * from userfeedback", function (error, result16) {
                                                                    if (error) { throw error }
                                                                    else {
                                                                      pool.query("select * from contactus", function (error, result17) {
                                                                        if (error) { throw error }
                                                                        else {
                                                                          pool.query("select * from contribution_req", function (error, result18) {
                                                                            if (error) { throw error }
                                                                            else {
                                                                              console.log(result4[0].count4, result6)
                                                                              res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10, experienceData: result11, projectData: result12, skillData: result13, hobbyData: result14, languageData: result15, feedbackData: result16, queryData: result17, requestData: result18 })
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
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})
router.post('/plan', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("contributorPlans", { result: result[0], message: "All the template designs can only be approved by the admin, if the contributor fullfill all the requirements as per their respective plan.", message1: null })
    }
  })
})
router.post('/contribute', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("contributorRequest", { result: result[0], plan: null })
    }
  })
})
router.post('/contributorProfile', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("contributorProfile", { result: result[0] })
    }
  })
})
router.post('/report', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='Call to action plan'", [req.body.user], function (error, result1) {
        if (error) { throw error }
        else {
          pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='Royalty Plan'", [req.body.user], function (error, result2) {
            if (error) { throw error }
            else {
              pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='No Cost Plan'", [req.body.user], function (error, result3) {
                if (error) { throw error }
                else {
                  pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='Call to action plan' and status='Approved'", [req.body.user], function (error, result4) {
                    if (error) { throw error }
                    else {
                      pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='Royalty Plan' and status='Approved'", [req.body.user], function (error, result5) {
                        if (error) { throw error }
                        else {
                          pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='No Cost Plan' and status='Approved'", [req.body.user], function (error, result6) {
                            if (error) { throw error }
                            else {
                              pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='Call to action plan' and status='Cancelled'", [req.body.user], function (error, result7) {
                                if (error) { throw error }
                                else {
                                  pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='Royalty Plan' and status='Cancelled'", [req.body.user], function (error, result8) {
                                    if (error) { throw error }
                                    else {
                                      pool.query("SELECT count(*) as count FROM contribution_req where userid=? and plan='No Cost Plan' and status='Cancelled'", [req.body.user], function (error, result9) {
                                        if (error) { throw error }
                                        else {
                                          res.render("contributorReport", { result: result[0], result1: result1[0], result2: result2[0], result3: result3[0], result4: result4[0], result5: result5[0], result6: result6[0],result7:result7[0],result8:result8[0],result9:result9[0] })
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
          })
        }
      })
    }
  })
})
router.post('/choosePlan', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(req.body)
      if (req.body.nocost) {
        res.render("contributorRequest", { result: result[0], plan: 'No Cost Plan' })
      }
      else if (req.body.calltoaction) {
        res.render("contributorRequest", { result: result[0], plan: 'Call to Action' })
      }
      else if (req.body.royalty) {
        res.render("contributorRequest", { result: result[0], plan: 'Royalty' })
      }
    }
  })
})
router.post('/contributorInterface', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("contributorInterface", { result: result[0], message: null })
    }
  })
})

router.get('/personalDetails', function (req, res) {
  console.log(req.query.userid)
  res.render("personalDetails", { id: req.query.userid })
})
router.get('/ResumeDetails', function (req, res) {
  pool.query("select * from personal_details natural join education natural join languages where userid=?", [req.query.userid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0])
      if (result[0] == undefined) {
        pool.query("select * from registration where userid=?", [req.query.userid], function (error, result1) {
          if (error) { throw error }
          else {
            res.render("UserInterface", { id: req.query.userid, result: result1[0], message: "Looks like you have'nt entered essential details like personal details, education or language details. Insert and move ahead.!", message1: null, templateid: null })
          }
        })
      }
      else {
        pool.query("select * from personal_details where userid=?", [req.query.userid], function (error, result) {
          if (error) {
            console.log("Error:", error)
            throw error;
          }
          else {
            res.render("updatePersonalDetails", { id: req.query.userid, result: result[0] })
          }
        })
      }
    }
  })
})

router.post('/updateprofile/:id', function (req, res) {
  pool.query("update registration set name=?,email=?,password=? where userid=?", [req.body.uname, req.body.mail, req.body.password, req.params.id], function (error, result) {
    if (error) {
      console.log("Error:", error)
      throw error;
    }
    else {
      console.log(result)
      console.log(req.params.id)
      res.redirect("/landing/Home")
    }
  })
})
router.post('/updatePersonaldetails', function (req, res) {
  pool.query("update personal_details set fname=?,lname=?,pemail=?,mobile=?,designation=?,linkedin=?,address=?,objective=? where userid=?", [req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.designation, req.body.linkedin, req.body.address, req.body.objective, req.body.user], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      pool.query("select * from education where userid=?", [req.body.user], function (error, result) {
        if (error) { throw error }
        else {
          res.render('updateEducation', { id: req.body.user, result: result[0] })
        }
      })
    }
  })
})
router.post('/updateEducation', function (req, res) {
  pool.query("update education set ssc_passyear=?,ssc_per=?,hsc_passyear=?,hsc_per=?,hsc_spec=?,ug_passyear=?,ug_cgpa=?,ug_spec=?,pg_passyear=?,pg_cgpa=?,pg_spec=? where userid=?", [req.body.sscyear, req.body.sscper, req.body.hscyear, req.body.hscper, req.body.hscspec, req.body.ugyear, req.body.ugper, req.body.ugspec, req.body.pgyear, req.body.pgper, req.body.pgspec, req.body.user], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      pool.query("select * from experience where userid=?", [req.body.user], function (error, result) {
        if (error) { throw error }
        else {
          res.render('updateExperience', { id: req.body.user, result: result })
        }
      })
    }
  })
})
router.post('/updateExperience', function (req, res) {
  pool.query("select count(*) as count from experience where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(req.body.user)
      console.log(result[0].count, "Experience")
      if (result[0].count == 1) {
        pool.query("update experience set company=?,timeperiod=?,description=? where experienceid=?", [req.body.cname, req.body.time, req.body.desc, req.body.exid], function (error, result) {
          if (error) {
            throw error;
          }
          else {
            console.log("Updated Successfully")
          }
        })

      }
      else {

        for (var i = 0; i < result[0].count; i++) {
          pool.query("update experience set company=?,timeperiod=?,description=? where experienceid=?", [req.body.cname[i], req.body.time[i], req.body.desc[i], req.body.exid[i]], function (error, result) {
            if (error) {
              throw error;
            }
            else {
              console.log(req.body.cname[i], req.body.time[i], req.body.desc[i], req.body.exid[i])
              console.log("Updated Successfully")
            }
          })
        }
      }
      pool.query('select * from skills where userid=?', [req.body.user], function (error, result1) {
        if (error) { throw error }
        else {
          pool.query('select * from hobbies where userid=?', [req.body.user], function (error, result2) {
            if (error) { throw error }
            else {
              res.render('updateSkillsHobbies', { id: req.body.user, result1: result1, result2: result2 })

            }
          })
        }

      })

    }
  })
})
router.post('/updateSkillsHobbies', function (req, res) {
  pool.query("select count(*) as count from skills where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].count, "SKILLS")
      if (result[0].count == 1) {
        pool.query("update skills set skill=? where skillid=?", [req.body.skills, req.body.sid], function (error, result) {
          if (error) {
            throw error;
          }
          else {
            console.log(req.body)
            console.log("Updated Successfully")
          }
        })

      }
      else {
        for (var i = 0; i < result[0].count; i++) {
          pool.query("update skills set skill=? where skillid=?", [req.body.skills[i], req.body.sid[i]], function (error, result) {
            if (error) {
              throw error;
            }
            else {
              console.log(req.body)
              console.log("Updated Successfully")
            }
          })
        }
      }
      pool.query("select count(*) as count from hobbies where userid=?", [req.body.user], function (error, result) {
        if (error) { throw error }
        else {
          if (result[0].count == 1) {
            pool.query("update hobbies set hobbies=? where hobbyid=?", [req.body.hobbies, req.body.hid], function (error, result) {
              if (error) {
                throw error;
              }
              else {
                console.log("Updated Successfully")
              }
            })
          }
          else {
            for (var i = 0; i < result[0].count; i++) {
              pool.query("update hobbies set hobbies=? where hobbyid=?", [req.body.hobbies[i], req.body.hid[i]], function (error, result) {
                if (error) {
                  throw error;
                }
                else {
                  console.log("Updated Successfully")
                }
              })
            }
          }

          pool.query('select * from awards_achieve where userid=?', [req.body.user], function (error, result) {
            if (error) { throw error }
            else {
              res.render('updateAwards', { id: req.body.user, result: result })
            }
          })
        }
      })
    }
  })
})
router.post('/updateAwards', function (req, res) {
  pool.query("select count(*) as count from awards_achieve group by userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].count, "Awards")
      if (result[0].count == 1) {
        pool.query("update awards_achieve set validfrom=?,validto=?,award_desc=? where awardsid=?", [req.body.validfrom, req.body.validto, req.body.award_desc, req.body.aid], function (error, result) {
          console.log(req.body.validfrom)
          if (error) {
            throw error;
          }
          else {
            console.log(result)
            console.log("Updated Successfully")
          }
        })
      }
      else {

        for (var i = 0; i <= result[0].count; i++) {
          pool.query("update awards_achieve set validfrom=?,validto=?,award_desc=? where awardsid=?", [req.body.validfrom[i], req.body.validto[i], req.body.award_desc[i], req.body.aid[i]], function (error, result) {
            console.log(req.body.validfrom[i])
            if (error) {
              throw error;
            }
            else {
              console.log(result)
              console.log("Updated Successfully")
            }
          })
        }
      }
    }
    pool.query('select * from languages where userid=?', [req.body.user], function (error, result) {
      if (error) { throw error }
      else {
        res.render('updateLanguages', { id: req.body.user, result: result })
      }
    })
  })
})
router.post('/updateLanguages', function (req, res) {
  pool.query("select count(*) as count from languages where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      if (result[0].count == 1) {
        pool.query("update languages set languages=? where languagesid=?", [req.body.languages, req.body.lid], function (error, result) {
          if (error) {
            throw error;
          }
          else {
            console.log("Updated Successfully")
          }
        })
      }
      else {

        for (var i = 0; i < result[0].count; i++) {
          pool.query("update languages set languages=? where languagesid=?", [req.body.languages[i], req.body.lid[i]], function (error, result) {
            if (error) {
              throw error;
            }
            else {
              console.log("Updated Successfully")
            }
          })
        }
      }
    }
    pool.query("select * from project where userid=?", [req.body.user], function (error, result) {
      if (error) { throw error }
      else {
        res.render("updateProjects", { id: req.body.user, result: result })
      }
    })
  })
})
router.post('/updateProjects', function (req, res) {
  pool.query("select count(*) as count from project where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      if (result[0].count == 1) {
        pool.query("update project set projectname=?,role=?,projectlink=?,projectdesc=? where projectid=?", [req.body.projectname, req.body.type, req.body.projectlink, req.body.projectdesc, req.body.prid], function (error, result) {
          if (error) {
            throw error;
          }
          else {
            console.log("Updated Successfully")
            console.log(req.body)
            pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
              if (error) { throw error }
              else {
                res.render('UserInterface', { id: result[0].userid, result: result[0], message: null, message1: null, templateid: null })
              }
            })
          }
        })
      }
      else {

        for (var i = 0; i < result[0].count; i++) {
          pool.query("update project set projectname=?,role=?,projectlink=?,projectdesc=? where projectid=?", [req.body.projectname[i], req.body.type[i], req.body.projectlink[i], req.body.projectdesc[i], req.body.prid[i]], function (error, result) {
            if (error) {
              throw error;
            }
            else {
              console.log("Updated Successfully")
              console.log(req.body)
              pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
                if (error) { throw error }
                else {
                  res.render('UserInterface', { id: result[0].userid, result: result[0], message: null, message1: null, templateid: null })
                }
              })
            }
          })
        }
      }

    }
  })

})
router.post('/navpersonal', function (req, res) {
  console.log(req.body)
  res.render("personalDetails", { id: req.body.user })
})
router.post('/personal', function (req, res) {
  console.log(req.body)
  pool.query("select * from personal_details where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result)
      res.render("updatePersonalDetails", { id: req.body.user, result: result[0] })
    }
  })
})
router.post('/naveducation', function (req, res) {
  console.log(req.body)
  res.render("education", { id: req.body.user })
})
router.post('/education', function (req, res) {
  console.log(req.body)
  pool.query("select * from education where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result)
      res.render("updateEducation", { id: req.body.user, result: result[0] })
    }
  })
})
router.post('/navexperience', function (req, res) {
  console.log(req.body)
  res.render("experience", { id: req.body.user })
})
router.post('/experience', function (req, res) {
  console.log(req.body)
  pool.query("select * from experience where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result)
      res.render("updateExperience", { id: req.body.user, result: result })
    }
  })
})
router.post('/navskillshobbies', function (req, res) {
  console.log(req.body)
  res.render("skillsHobbies", { id: req.body.user })
})
router.post('/skillshobbies', function (req, res) {
  console.log(req.body)
  pool.query("select * from skills where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error }
    else {
      pool.query("select * from hobbies where userid=?", [req.body.user], function (error, result2) {
        if (error) { throw error }
        else {
          res.render("updateSkillsHobbies", { id: req.body.user, result1: result1, result2: result2 })
        }
      })

    }
  })
})
router.post('/navawards', function (req, res) {
  console.log(req.body)
  res.render("awardsAchievements", { id: req.body.user })
})
router.post('/awards', function (req, res) {
  console.log(req.body)
  pool.query("select * from awards_achieve where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("updateAwards", { id: req.body.user, result: result })
    }
  })
})
router.post('/navlanguages', function (req, res) {
  console.log(req.body)
  res.render("languagesKnown", { id: req.body.user })
})
router.post('/languages', function (req, res) {
  console.log(req.body)
  pool.query("select * from languages where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("updateLanguages", { id: req.body.user, result: result })
    }
  })
})
router.post('/navprojects', function (req, res) {
  console.log(req.body)
  res.render("projects", { id: req.body.user })
})
router.post('/projects', function (req, res) {
  console.log(req.body)
  pool.query("select * from project where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("updateProjects", { id: req.body.user, result: result })
    }
  })
})
router.post('/exit', function (req, res) {
  console.log(req.body)
  pool.query("select  * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error }
    else {
      res.render("UserInterface", { id: req.body.user, result: result[0], message: null, message1: null, templateid: req.body.template })
    }
  })
})
router.post('/feedback', function (req, res) {
  console.log(req.body)
  pool.query("insert into userfeedback (userid,name,mobile,email,feedback) values(?,?,?,?,?)", [req.body.userid, req.body.name, req.body.mobile, req.body.email, req.body.feedback], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from registration where userid=?", [req.body.userid], function (error, result) {
        if (error) { throw error }
        else {
          res.render("UserInterface", { id: req.body.userid, result: result[0], message: null, message1: null, templateid: null })

        }
      })

    }
  })
})
router.post('/skipPersonalDetails', function (req, res) {
  pool.query("select * from education where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result[0])
      if (result[0] == undefined) {
        pool.query("select * from experience where userid=?", [req.body.user], function (error, result1) {
          if (error) { throw error }
          else {
            console.log(result1)
            res.render("updateExperience", { id: req.body.user, result: result1 })
          }
        })
      }
      else {
        res.render("updateEducation", { id: req.body.user, result: result[0] })
      }

    }
  })
})
router.post('/skipEducation', function (req, res) {
  pool.query("select * from experience where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result)
      res.render("updateExperience", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipExperience', function (req, res) {
  pool.query("select * from skills where userid=?", [req.body.user], function (error, result1) {
    if (error) { throw error; }
    else {
      pool.query("select * from hobbies where userid=?", [req.body.user], function (error, result2) {
        if (error) { throw error }
        else {
          console.log(result1, result2)
          res.render("updateSkillsHobbies", { id: req.body.user, result1: result1, result2: result2 })
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
      res.render("updateAwards", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipAwards', function (req, res) {
  pool.query("select * from languages where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result)
      res.render("updateLanguages", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipLanguages', function (req, res) {
  pool.query("select * from project where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result)
      res.render("updateProjects", { id: req.body.user, result: result })
    }
  })
})
router.post('/skipProjects', function (req, res) {
  pool.query("select * from registration where userid=?", [req.body.user], function (error, result) {
    if (error) { throw error; }
    else {
      console.log(result)
      res.render("UserInterface", { id: req.body.user, result: result[0], message: null, message1: null, templateid: null })
    }
  })
})
router.post('/chooseTemplate', function (req, res) {
  res.render("viewTemplate", { id: req.body.userid, message: null });
})

module.exports = router;
