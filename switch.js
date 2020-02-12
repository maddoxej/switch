(function(){
    var localStorage = window.localStorage || {};
    localStorage.switch = localStorage.switch || "";
    var numberOfSwitches = parseInt((new URL(document.location)).searchParams.get("s")) || parseInt(localStorage.switchCount);
    if (isNaN(numberOfSwitches) || numberOfSwitches < 1 || numberOfSwitches > 99) {
        numberOfSwitches = 1;
    }

    setSwitchCount(numberOfSwitches);

    function setSwitchCount(numberOfSwitches) {
        var dif = document.querySelectorAll(".switch").length - numberOfSwitches;
        if (dif > 0) {
            var switches =[].slice.call(document.querySelectorAll(".switch"));
            for (var i = dif; i > 0 ; i--){
                    var s = switches[numberOfSwitches - i + 1];
                    s.parentNode.removeChild(s);
                }
        } 
        if (dif < 0) {
            for (var i = numberOfSwitches + dif + 1; i<= numberOfSwitches; i++) {
                var template = document.getElementById("switch1");
                var newSwitch = template.cloneNode(true);
                newSwitch.id = "switch" + i;
                var cb = newSwitch.querySelector("input");
                cb.setAttribute("aria-label", "C" + i);
                setSwitchValue(newSwitch);
                template.parentNode.appendChild(newSwitch);
            }
        }

        localStorage.switchCount = numberOfSwitches.toString();
    }

    function setAllSwitchValues() {
        var switches =[].slice.call(document.querySelectorAll(".switch"));
        switches.forEach(setSwitchValue);
    }

    function setSwitchValue(s){
        var cb = s.querySelector("input");
        cb.checked = localStorage.switch.includes(s.id + ",");
        cb.addEventListener('change', (event) => {
            if (event.target.checked){
                if (!localStorage.switch.includes(s.id + ",")){
                    localStorage.switch += s.id + ",";
                }
            }
            else{
                localStorage.switch = localStorage.switch.replace(s.id + ",","");
            } 
        });       
    }

    setAllSwitchValues();

    var resetButton = document.querySelector("input.reset");
    resetButton.addEventListener('click', function(){
        var switches =[].slice.call(document.querySelectorAll(".switch"));
        switches.forEach(s =>{
            var cb = s.querySelector("input");
            cb.checked = false;
        });

        localStorage.switch = "";
    });

    var removeButton = document.querySelector(".removeButton");
    removeButton.addEventListener('click', function(){
        var numberOfSwitches = parseInt(localStorage.switchCount) - 1;
        if (numberOfSwitches > 0) {
            setSwitchCount(numberOfSwitches);
        }
    });

    var addButton = document.querySelector(".addButton");
    addButton.addEventListener('click', function(){
        var numberOfSwitches = parseInt(localStorage.switchCount) + 1;
        setSwitchCount(numberOfSwitches);
    });
})();
