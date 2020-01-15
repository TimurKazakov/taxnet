const fetch = require("node-fetch");
function f() {

    console.log(__dirname+'\\react_middle\\react_middle\\react_junior\\films.json\\');
    let films =  fetch(__dirname+' \\react_middle\\react_middle\\react_junior\\films.json');
    if (films.ok) {
        let json =  films.json();
        console.log(json);
    }
}
f();
