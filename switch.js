(function(){
    var localStorage = window.localStorage || {};
    localStorage.switch = localStorage.switch || "";
    var numberOfSwitches = parseInt((new URL(document.location)).searchParams.get("s"));
    if (!isNaN(numberOfSwitches) && numberOfSwitches > 1) {
        for (var i = 2; i<= numberOfSwitches; i++) {
            var template = document.getElementById("switch1");
            var newSwitch = template.cloneNode(true);
            newSwitch.id = "switch" + i;
            template.parentNode.appendChild(newSwitch);
        }
    }

    var switches =[].slice.call(document.querySelectorAll(".switch"));
    switches.forEach(s =>{
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
        cb.disabled = false;
    });

    var resetButton = document.querySelector("input.reset");
    resetButton.addEventListener('click', function(){
        var switches =[].slice.call(document.querySelectorAll(".switch"));
        switches.forEach(s =>{
            var cb = s.querySelector("input");
            cb.checked = false;
        });
        
        localStorage.switch = "";
    });
})();
