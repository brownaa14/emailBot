function sendWeeklyUpdate() {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();;
    if (!sheet) {
      Logger.log('Sheet not found.');
      return;
    }
    var data = sheet.getDataRange().getValues();
    var lastRow = sheet.getLastRow();
    var oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    var emailBody = "Here are the weekly updates from everyone:\n\n";
    for (var i = 1; i < lastRow; i++) {
      var timestamp = new Date(data[i][0]);
      if (timestamp >= oneWeekAgo) {
        emailBody += "Name: " + data[i][1] + "\n\n";
        emailBody += "Update: " + data[i][2] + "\n\n"
        emailBody += "Prayer Intentions: " + data[i][3] + "\n\n\n";
      }
    }

    var emailRecipients = ""; // Add your friends' email addresses here
    var subject = "Weekly Updates!";
    MailApp.sendEmail(emailRecipients, subject, emailBody);
    Logger.log('Email sent successfully.');
  } catch (e) {
    Logger.log('Error: ' + e.toString());
  }
}

function sendWeeklyReminder() {
  var formUrl = '';
  var emailBody = "Hey everyone,\n\nDon't forget to submit your weekly update using the form below:\n\n" + formUrl;
  
  var emailRecipients = ""; // Add your friends' email addresses here
  var subject = "ACTION REQUIRED: Fill out Weekly Updates!";
  MailApp.sendEmail(emailRecipients, subject, emailBody);
}

function createWeeklyTriggers() {
  // Trigger for sending the weekly update email
  ScriptApp.newTrigger('sendWeeklyUpdate')
    .timeBased()
    .everyWeeks(1)
    .onWeekDay(ScriptApp.WeekDay.TUESDAY) // Choose the day you want the update email sent
    .atHour(16) // Choose the hour
    .create();

  // Trigger for sending the weekly reminder email
  ScriptApp.newTrigger('sendWeeklyReminder')
    .timeBased()
    .everyWeeks(1)
    .onWeekDay(ScriptApp.WeekDay.TUESDAY) // Choose the day you want the reminder email sent
    .atHour(16) // Choose the hour
    .create();
}
