const Student = {
  // please fill in your name and NetID
  // your NetID is the part of your email before @princeton.edu
  name: "Pericles Borges",
  netID: "5326",
};

Student.updateHTML = function() {
  const studentInfo = this.name + " &lt;" + this.netID + "&gt;";
  document.getElementById("student").innerHTML = studentInfo;
};
