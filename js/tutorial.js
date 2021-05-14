// This function just steps through the elements to progress the tutorial
function tutorial(clicked_id) {
    var step = parseInt(clicked_id[4]);
    document.getElementById("tut" + step).style.display = "none";
    document.getElementById("tut" + (step + 1)).style.display = "block";
    if (step > 1 ) {
        let nodeQ = document.getElementById("tutQ" + (step - 1)).value;
        document.getElementById("name " + (step - 1)).value = nodeQ;
    };
};
// This is how I track which topics they have selected from the initial prompt
function tutorialTopics() {
    var object = document.getElementById("object");
    var objectR = object.value;
    var target = document.getElementById("target");
    var targetR = target.value;
    var object_target = objectR + targetR;
    if (object_target == "personlife") {
        document.getElementById("tutq1").innerHTML = person_life[0];
        document.getElementById("tutq2").innerHTML = person_life[1];
        document.getElementById("tutq3").innerHTML = person_life[2];
    } else if (object_target == "personsociety") {
        document.getElementById("tutq1").innerHTML = person_society[0];
        document.getElementById("tutq2").innerHTML = person_society[1];
        document.getElementById("tutq3").innerHTML = person_society[2];
    } else if (object_target == "personhistory") {
        document.getElementById("tutq1").innerHTML = person_history[0];
        document.getElementById("tutq2").innerHTML = person_history[1];
        document.getElementById("tutq3").innerHTML = person_history[2];
    } else if (object_target == "institutionlife") {
        document.getElementById("tutq1").innerHTML = institution_life[0];
        document.getElementById("tutq2").innerHTML = institution_life[1];
        document.getElementById("tutq3").innerHTML = institution_life[2];
    } else if (object_target == "institutionsociety") {
        document.getElementById("tutq1").innerHTML = institution_society[0];
        document.getElementById("tutq2").innerHTML = institution_society[1];
        document.getElementById("tutq3").innerHTML = institution_society[2];
    } else if (object_target == "institutionhistory") {
        document.getElementById("tutq1").innerHTML = institution_history[0];
        document.getElementById("tutq2").innerHTML = institution_history[1];
        document.getElementById("tutq3").innerHTML = institution_history[2];
    } else if (object_target == "thinglife") {
        document.getElementById("tutq1").innerHTML = thing_life[0];
        document.getElementById("tutq2").innerHTML = thing_life[1];
        document.getElementById("tutq3").innerHTML = thing_life[2];
    } else if (object_target == "thingsociety") {
        document.getElementById("tutq1").innerHTML = thing_society[0];
        document.getElementById("tutq2").innerHTML = thing_society[1];
        document.getElementById("tutq3").innerHTML = thing_society[2];
    } else if (object_target == "thinghistory") {
        document.getElementById("tutq1").innerHTML = thing_history[0];
        document.getElementById("tutq2").innerHTML = thing_history[1];
        document.getElementById("tutq3").innerHTML = thing_history[2];
    } else if (object_target == "conceptlife") {
        document.getElementById("tutq1").innerHTML = concept_life[0];
        document.getElementById("tutq2").innerHTML = concept_life[1];
        document.getElementById("tutq3").innerHTML = concept_life[2];
    } else if (object_target == "conceptsociety") {
        document.getElementById("tutq1").innerHTML = concept_society[0];
        document.getElementById("tutq2").innerHTML = concept_society[1];
        document.getElementById("tutq3").innerHTML = concept_society[2];
    } else if (object_target == "concepthistory") {
        document.getElementById("tutq1").innerHTML = concept_history[0];
        document.getElementById("tutq2").innerHTML = concept_history[1];
        document.getElementById("tutq3").innerHTML = concept_history[2];
    } else if (object_target == "systemlife") {
        document.getElementById("tutq1").innerHTML = system_life[0];
        document.getElementById("tutq2").innerHTML = system_life[1];
        document.getElementById("tutq3").innerHTML = system_life[2];
    } else if (object_target == "systemsociety") {
        document.getElementById("tutq1").innerHTML = system_society[0];
        document.getElementById("tutq2").innerHTML = system_society[1];
        document.getElementById("tutq3").innerHTML = system_society[2];
    } else if (object_target == "systemhistory") {
        document.getElementById("tutq1").innerHTML = system_history[0];
        document.getElementById("tutq2").innerHTML = system_history[1];
        document.getElementById("tutq3").innerHTML = system_history[2];
    } else if (object_target == "eventlife") {
        document.getElementById("tutq1").innerHTML = event_life[0];
        document.getElementById("tutq2").innerHTML = event_life[1];
        document.getElementById("tutq3").innerHTML = event_life[2];
    } else if (object_target == "eventsociety") {
        document.getElementById("tutq1").innerHTML = event_society[0];
        document.getElementById("tutq2").innerHTML = event_society[1];
        document.getElementById("tutq3").innerHTML = event_society[2];
    } else if (object_target == "eventhistory") {
        document.getElementById("tutq1").innerHTML = event_history[0];
        document.getElementById("tutq2").innerHTML = event_history[1];
        document.getElementById("tutq3").innerHTML = event_history[2];
    }
}

// Truly no reason for this function to exist
function tutorialNodes(clicked_id) {
    var nodeQ = parseInt(clicked_id[4]);
    console.log(document.getElementById("tutq" + nodeQ).value)
}
 // Arrays for question sets in the tutorial:
var person_life = ["What's something that you two share?", "What's a memory that the shared thing reminds you of?", "What's something else that you two share?"];
var person_society = ["What's something that this person has contributed to society?", "What's a lasting effect of their contribution?", "What's a social practice that they help to perpetuate?"];
var person_history = ["What's a historical event this person has had a hand in?", "What's a lasting effect of this historical event?", "What's a material impact of their presence?"];

var institution_life = ["What is one way that this institution adds to your life?", "What is an effect of the thing this institution adds to your life?", "What is one way that this institution takes from your life?"];
var institution_society = ["What is one way that this institution adds to society?", "What is an effect of the thing this institution adds to society?", "What is one way that this institution takes from society?"];
var institution_history = ["What is an effect that this institution had on history?", "What is one material way that that effect persists?", "What was the historical precursor to this institution?"];

var thing_life = ["What's one way that this thing manifests itself in your life?", "What's an effect of this manifestation?", "Who has given you this thing, or where did you get it from?"];
var thing_society = ["How is this thing made?", "Who are some of the people who make it?", "Who are some of the people who use it?"];
var thing_history = ["What's a historical event when/where this thing was used?", "What's an effect of that historical event?", "Who used to make this thing?"];

var concept_life = ["What's an example of how this concept takes shape in your life?", "What's an effect of this concept taking shape in this way?", "Who do you see believing in or practicing this concept?"];
var concept_society = ["What's an example of how this concept takes shape in society?", "What's an effect of this concept taking shape in this way?", "What's an example of how society embraces this concept?"];
var concept_history = ["What's an example of how this concept takes shape in history?", "What's a lasting effect of this concept taking shape in this way?", "What's a historical event that relied on this concept?"];

var system_life = ["What is a manifestation of this system in your life?", "What's an effect of the system's manifestation?", "What resources does this system depend upon?"];
var system_society = ["What is a manifestation of this system in society?", "What's an effect of the system's manifestation?", "What's another system that this system is linked to?"];
var system_history = ["What is a manifestation of this system in history?", "What's an effect of the system's manifestation?", "What's one way has this system persisted throughout time?"];

var event_life = ["Name someone who was involved in this event.", "What has this person gone on to do or not do because of it?", "What is something you chose to do or not do because of this event?"];
var event_society = ["Name a group of people who were involved in this event.", "What has this group of people gone on to do or not to do because of it?", "What is one of the lasting signs of this event in society?"];
var event_history = ["Name an event caused by your event.", "Name an event that that event caused.", "Who was involved in the original event?"];

