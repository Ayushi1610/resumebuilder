var express = require('express');
var router = express.Router();
var pool = require('./pool')
router.post('/userUpdate', function (req, res) {
  console.log(req.body.aemail)
  pool.query("select * from registration where userid=?", [req.body.userid], function (error, result) {
    if (error) { throw error }
    else {
      res.render("adminUserUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass })
    }
  })

})
router.post('/personalUpdate', function (req, res) {
  console.log(req.body.aemail)
  pool.query("select * from personal_details where userid=?", [req.body.userid], function (error, result) {
    if (error) { throw error }
    else {
      res.render("adminPersonalUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass })
    }
  })

})
router.post('/educationUpdate', function (req, res) {
  console.log(req.body.aemail)
  pool.query("select * from education where userid=?", [req.body.userid], function (error, result) {
    if (error) { throw error }
    else {
      res.render("adminEducationUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass })
    }
  })

})
router.post('/awardsUpdate', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from awards_achieve where userid=? and awardsid=?", [req.body.userid, req.body.aid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminAwardsUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, awardsid: req.body.aid, userid: result[0].userid })
    }
  })

})
router.post('/experienceUpdate', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from experience where userid=? and experienceid=?", [req.body.userid, req.body.exid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminExperienceUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, experienceid: req.body.exid, userid: result[0].userid })
    }
  })

})
router.post('/projectUpdate', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from project where userid=? and projectid=?", [req.body.userid, req.body.pid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminProjectUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, projectid: req.body.pid, userid: result[0].userid })
    }
  })

})
router.post('/skillUpdate', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from skills where userid=? and skillid=?", [req.body.userid, req.body.sid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminSkillUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, skillid: req.body.sid, userid: result[0].userid })
    }
  })

})
router.post('/hobbyUpdate', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from hobbies where userid=? and hobbyid=?", [req.body.userid, req.body.hid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminHobbyUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, hobbyid: req.body.hid, userid: result[0].userid })
    }
  })

})
router.post('/languageUpdate', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from languages where userid=? and languagesid=?", [req.body.userid, req.body.lid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminLanguageUpdate", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, languagesid: req.body.lid, userid: result[0].userid })
    }
  })

})
router.post('/feedbackRead', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from userfeedback where userid=? and feedbackid=?", [req.body.userid, req.body.fid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminFeedbackRead", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, feedbackid: req.body.fid, userid: result[0].userid })
    }
  })

})
router.post('/queryRead', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from contactus where contactid=?", [req.body.cid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminQueryRead", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, contactid: req.body.cid, userid: result[0].userid })
    }
  })

})
router.post('/requestRead', function (req, res) {
  console.log(req.body, "BODYYYYYYYYYYY")
  pool.query("select * from contribution_req where userid=? and requestid=?", [req.body.userid,req.body.rid], function (error, result) {
    if (error) { throw error }
    else {
      console.log(result[0].userid)
      res.render("adminRequestRead", { result: result[0], aemail: req.body.aemail, apass: req.body.apass, requestid: req.body.rid, userid: result[0].userid })
    }
  })

})
router.post('/deleteUser', function (req, res) {
  console.log(req.body.aemail)
  pool.query("delete from registration where userid=?", [req.body.userid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })

})
router.post('/deletePersonal', function (req, res) {
  console.log(req.body.aemail)
  pool.query("delete from personal_details where userid=?", [req.body.userid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteEducation', function (req, res) {
  console.log(req.body.aemail)
  pool.query("delete from education where userid=?", [req.body.userid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteAwards', function (req, res) {
  console.log(req.body)
  pool.query("delete from awards_achieve where userid=? and awardsid=?", [req.body.userid, req.body.aid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteExperience', function (req, res) {
  console.log(req.body)
  pool.query("delete from experience where userid=? and experienceid=?", [req.body.userid, req.body.exid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteProject', function (req, res) {
  console.log(req.body)
  pool.query("delete from project where userid=? and projectid=?", [req.body.userid, req.body.pid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteSkill', function (req, res) {
  console.log(req.body)
  pool.query("delete from skills where userid=? and skillid=?", [req.body.userid, req.body.sid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteHobby', function (req, res) {
  console.log(req.body)
  pool.query("delete from hobbies where userid=? and hobbyid=?", [req.body.userid, req.body.hid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteLanguage', function (req, res) {
  console.log(req.body)
  pool.query("delete from languages where userid=? and languagesid=?", [req.body.userid, req.body.lid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteFeedback', function (req, res) {
  console.log(req.body)
  pool.query("delete from userfeedback where userid=? and feedbackid=?", [req.body.userid, req.body.fid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/deleteQuery', function (req, res) {
  console.log(req.body)
  pool.query("delete from contactus where contactid=?", [req.body.cid], function (error, result) {
    if (error) { throw error }
    else {
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminUserUpdate', function (req, res) {
  console.log(req.body)
  pool.query("update registration set name=?,email=?,password=?,type=?,date=? where userid=?", [req.body.name, req.body.email, req.body.password, req.body.type, req.body.date, req.body.userid], function (error, result0) {
    if (error) {
      console.log("Error:", error)
      throw error;
    }
    else {
      console.log(result0)
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminPersonalUpdate', function (req, res) {
  console.log(req.body)
  pool.query("update personal_details set fname=?,lname=?,pemail=?,mobile=?,designation=?,linkedin=?,address=?,objective=? where userid=?", [req.body.fname, req.body.lname, req.body.email, req.body.phone, req.body.designation, req.body.linkedin, req.body.address, req.body.objective, req.body.userid], function (error, result0) {
    if (error) {
      console.log("Error:", error)
      throw error;
    }
    else {
      console.log(result0)
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminEducationUpdate', function (req, res) {
  console.log(req.body)
  pool.query("update education set ssc_passyear=?,ssc_per=?,hsc_passyear=?,hsc_per=?,hsc_spec=?,ug_passyear=?,ug_cgpa=?,ug_spec=?,pg_passyear=?,pg_cgpa=?,pg_spec=? where userid=?", [req.body.sscyear, req.body.sscper, req.body.hscyear, req.body.hscper, req.body.hscspec, req.body.ugyear, req.body.ugper, req.body.ugspec, req.body.pgyear, req.body.pgper, req.body.pgspec, req.body.userid], function (error, result0) {
    if (error) {
      console.log("Error:", error)
      throw error;
    }
    else {
      console.log(result0)
      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminAwardsUpdate', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update awards_achieve set validfrom=?,validto=?,award_desc=? where awardsid=? and userid=?", [req.body.validfrom, req.body.validto, req.body.award_desc, req.body.aid, req.body.userid], function (error, result) {
    console.log(req.body.validfrom)
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})

router.post('/adminExperienceUpdate', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update experience set company=?,timeperiod=?,description=? where experienceid=? and userid=?", [req.body.cname, req.body.time, req.body.desc, req.body.exid, req.body.userid], function (error, result) {
    console.log(req.body.validfrom)
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminProjectUpdate', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update project set projectname=?,role=?,projectlink=?,projectdesc=? where projectid=? and userid=?", [req.body.projectname, req.body.type, req.body.projectlink,req.body.projectdesc, req.body.pid, req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminSkillUpdate', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update skills set skill=? where skillid=? and userid=?", [req.body.skills, req.body.sid, req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminHobbyUpdate', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update hobbies set hobbies=? where hobbyid=? and userid=?", [req.body.hobbies, req.body.hid, req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/adminLanguageUpdate', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update languages set languages=? where languagesid=? and userid=?", [req.body.languages, req.body.lid, req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/approveRequest', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update contribution_req set status='Approved' where requestid=? and userid=?", [req.body.rid,req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})
router.post('/cancelRequest', function (req, res) {
  console.log(req.body, "UPDATEEEEEEEE")
  pool.query("update contribution_req set status='Cancelled' where requestid=? and userid=?", [req.body.rid,req.body.userid], function (error, result) {
    if (error) {
      throw error;
    }
    else {
      console.log(result)

      pool.query("select * from adminlogin where email=? and password=?", [req.body.aemail, req.body.apass], function (error, result) {
        console.log(result)
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
                                                          pool.query("select * from skills",function(error,result13){
                                                            if(error){throw error}
                                                            else{
                                                              pool.query("select * from hobbies",function(error,result14){
                                                                if(error){throw error}
                                                                else{
                                                                  pool.query("select * from languages",function(error,result15){
                                                                    if(error){throw error}
                                                                    else{
                                                                      pool.query("select * from userfeedback",function(error,result16){
                                                                        if(error){throw error}
                                                                        else{
                                                                          pool.query("select * from contactus",function(error,result17){
                                                                            if(error){throw error}
                                                                            else{
                                                                              pool.query("select * from contribution_req",function(error,result18){
                                                                                if(error){throw error}
                                                                                else{
                                                                                  console.log(result4[0].count4, result6)
                                                                                  res.render("adminInterface", { usercount: result1[0].count1, contributorcount: result2[0].count2, templatecount: result3[0].count3, graph1count: result4[0].count4, month: month, graph2count: result5[0].count5, userData: result6, result: result[0], contributorData: result7, personalData: result8, educationData: result9, awardsData: result10,experienceData:result11,projectData:result12,skillData:result13,hobbyData:result14,languageData:result15,feedbackData:result16,queryData:result17,requestData:result18 })
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
    }
  })
})

module.exports = router;
