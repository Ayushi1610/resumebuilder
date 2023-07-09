$('.links a').click(function (e) {
    e.preventDefault();
    var selector = $(this).attr('href');
    $('.subroot2.visible').addClass('hide').removeClass('visible');
    $(selector).addClass('visible').removeClass('hide');
 });
 var count = 1;
 $(function () {
    $(".repeat").on('click', function (e) {
       e.preventDefault();
       var $self = $(this);
       if (count < 3) {
          $self.before($self.prev('div').append(' <div style="display: flex;flex-direction: row;width: 100%;"><input type="text" name="cname" placeholder="Company Name"><input type="text" name="time" placeholder="Time Period"></div><textarea style="height:50px;border-radius: 5px;width: 97%;margin: 10px;" placeholder="Description" name="desc"></textarea>'));
          // $self.remove();
          count++
       }
       else {
          alert("Not able to add more than 3 experience")
       }
    });
 });

 var acount = 1;
 $(function () {
    $(".repeatfield").on('click', function (e) {
       e.preventDefault();
       var $self = $(this);
       if (acount < 3) {
          $self.before($self.prev('div').append('<div style="width: 100%;"><span style="color: #4bcef3;margin-right: 20px;">Date Issued</span><input type="date" name="issuedate" style="width: 20%;margin-right: 50px;"></div><textarea name="award_desc" maxlength="150" style="height:50px;border-radius: 5px;width: 97%;margin: 10px;" placeholder="Details" ></textarea>'));
          // $self.remove();
          acount++
       }
       else {
          alert("Not able to add more than 3 awards")
       }
    });
 });

 var pcount = 1;
 $(function () {
    $(".repeatproject").on('click', function (e) {
       e.preventDefault();
       var $self = $(this);
       if (pcount < 3) {
          $self.before($self.prev('div').append('<div style="display: flex;flex-direction: row;width:100%;"><input type="text" placeholder="Name" name="projectname"><select required name="type"><option>Role </option><option value="developer">Developer</option><option value="tester">Tester</option><option value="analyst">Analyst</option></select><input type="text" name="projectlink" placeholder="GitHub link/others"></div><textarea style="height:50px;border-radius: 5px;width: 97%;margin: 10px;" placeholder="Brief Description" name="projectdesc" maxlength="200"></textarea>'));
          // $self.remove();
          pcount++
       }
       else {
          alert("Not able to add more than 3 projects")
       }
    });
 });

 var room = 1;
 function skill_fields() {

    room++;
    var objTo = document.getElementById('skill_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass" + room);
    var rdiv = 'removeclass' + room;
    divtest.innerHTML = '<div style="display: flex;flex-direction: row;width:100%;" ><input  type="text" name="skills" placeholder="Add Skills"><button  onclick="remove_skill_fields(' + room + ');" class="active anchor" style="border-radius: 5px;padding: 8px 8px;width:12%;cursor: pointer;border: none;height: 35px;">-</button> </div>';

    objTo.appendChild(divtest)
 }
 function remove_skill_fields(rid) {
    $('.removeclass' + rid).remove();
 }

 var hobby = 1;
 function hobbies_fields() {

    hobby++;
    var objTo = document.getElementById('hobbies_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass" + hobby);
    var rdiv = 'removeclass' + hobby;
    divtest.innerHTML = '<div style="display: flex;flex-direction: row;width:100%;" ><input  type="text" name="hobbies" placeholder="Add Hobbies"><button  onclick="remove_hobbies_fields(' + hobby + ');" class="active anchor" style="border-radius: 5px;padding: 8px 8px;width:12%;cursor: pointer;border: none;height: 35px;">-</button> </div>';

    objTo.appendChild(divtest)
 }
 function remove_hobbies_fields(rid) {
    $('.removeclass' + rid).remove();
 }

 var language = 1;
 function language_fields() {

    language++;
    var objTo = document.getElementById('language_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass" + language);
    var rdiv = 'removeclass' + language;
    divtest.innerHTML = '<div style="display: flex;flex-direction: row;width:100%;" ><input  type="text" name="languages" placeholder="Add languages"><button  onclick="remove_language_fields(' + language + ');" class="active anchor" style="border-radius: 5px;padding: 8px 8px;width:12%;cursor: pointer;border: none;height: 35px;">-</button> </div>';

    objTo.appendChild(divtest)
 }
 function remove_language_fields(rid) {
    $('.removeclass' + rid).remove();
 }

 $('#limit').bind('input propertychange', function () {
    if (this.value.length > 150) {
       alert("Not allowed to enter more than 150 characters in description");
       $("#limit").val($("#limit").val().substring(0, 150));
    }
 });

 window.onbeforeunload = function () {
       return "are you sure you want to reload this page, your data will be lost";
 }