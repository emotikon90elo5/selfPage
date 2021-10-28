window.lasted = new Date().getTime()/1000; 
let i = 0;
const edit = () =>{
    let time = new Date().getTime()/1000; 
    console.log(i)
    i++
    if(time - window.lasted > 5) {
        i=0
        window.lasted = time
        let title = document.getElementById("title").value;
        console.log(title);;;;;;;;;;;;;;;;;;;;;
    }

}