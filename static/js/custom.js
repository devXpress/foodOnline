let autocomplete;

function initAutoComplete() {
    let input = document.getElementById('id_address');
    
    if (!input) {
        console.error("Autocomplete input field not found!");
        return;
    }

    autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["address"],
        componentRestrictions: { country: ["NG"] }, // Nigeria
    });

    // Event listener when a place is selected
    autocomplete.addListener("place_changed", onPlaceChanged);
}

function onPlaceChanged() {
    let place = autocomplete.getPlace();

    if (!place.geometry) {
        console.warn("No geometry found for selected place.");
        document.getElementById("id_address").placeholder = "Start typing...";
        return;
    }

    console.log("Selected place:", place.name);
}

// Ensure the script runs after DOM is loaded
document.addEventListener("DOMContentLoaded", initAutoComplete);
