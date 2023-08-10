/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);
var config = {
  host: window.location.hostname,
  prefix: prefix,
  port: window.location.port,
  isSecure: window.location.protocol === "https:",
};
require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources",
});

require(["js/qlik"], function (qlik) {
  qlik.on("error", function (error) {
    $("#popupText").append(error.message + "<br>");
    $("#popup").fadeIn(1000);
  });
  $("#closePopup").click(function () {
    $("#popup").hide();
  });

  //callbacks -- inserted here --
  //open apps -- inserted here --
  let app = qlik.openApp("b67f4e73-2c5f-4377-9cf0-1896f8bc2901", config);

  //get objects -- inserted here --

  //   getting the QS objects using get method
  app.visualization.get("ppvHAJ").then((vis) => {
    vis.show("QV01");
  });

    // creating visulatization using create method
  app.visualization
    .create("barchart", 
		[
			{
				"qDef": {
					"qFieldDefs": ["Case Owner Group"],
					"qFieldLabels": ["Group"]
				}
			}, "=Avg([Case Duration Time])"
		],
		{"title": "Simple Barchart"}
    )
    .then((bar) => {
      bar.show("QV02");
    });

	// app.visualization.create( 'pivot-table',
	// [
	// "Year",  //dimension
	// {"qDef": {"qFieldDefs": ["Case Owner Group"], "qFieldLabels": ["Group"]}},           //dimension with label
	// {"qDef": {"qDef": "=Avg([Case Duration Time])", "qLabel": "Avg Case Duration Time"}},//measure with label
	// {"qDef": {"qDef": "Sum( [Open Cases] )", "qLabel": "Open Cases"}}                    //measure with label
	// ],
	// {"title": "Case Owner Group Case stats per year"}
	// ).then((pivot)=>{
	// 	pivot.show("QV02");
	// })

  // Creating button toolbar using create method
  app.visualization
    .create("com-qliktech-toolbar", null, {
      "buttons": { "clear": true, "back": true, "forward": true },
    })
    .then((btn) => {
      btn.show("btn-container");
    });

	// Exploring the Qvisualization methods
	

  //create cubes and lists -- inserted here --
});
