var ListaDoctores = [];

function addDoctorToList(d_nombre, d_apellido, d_id, d_especialidad, d_consultorio, d_correo){
    var NewDoctor = {
        nombre: d_nombre,
        apellido: d_apellido,
        id: d_id,
        especialidad: d_especialidad,
        consultorio: d_consultorio,
        correo: d_correo
    };
    console.log(NewDoctor);
    ListaDoctores.push(NewDoctor);
    
    guardarDoctores(ListaDoctores);
}

function getDoctoresList(){
    var ListaGuardada = localStorage.getItem('localListaDoctores'); 
    if(ListaGuardada == null){
        ListaDoctores = [];
    } else{
        ListaDoctores = JSON.parse(ListaGuardada);
    }
    return ListaDoctores;
}

function guardarDoctores(lista_doctores){
    localStorage.setItem('localListaDoctores', JSON.stringify(lista_doctores));
}


const form_Doctor = document.getElementById('form__RegistroDoctor');

drawDoctores();

form_Doctor.addEventListener("submit", (e) => {
    e.preventDefault();

    // variables
    const Nombre = document.getElementById("input-nombre").value;
    const Apellido = document.getElementById("input-apellido").value;
    const Cedula = document.getElementById("input-id").value;
    const Especialidad = document.getElementById("input-especialidad").value;
    const Consultorio = document.getElementById("input-consultorio").value;
    const Correo = document.getElementById("input-correo").value;
    
    
    // expresiones regulares

    const expText =  /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/; 
    const expCedula = /^([0-9]{5,10})*$/;
    const expConsultorio = /^[0-9]{3}$/;
    const expCorreo= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    // validaciones

    if(Nombre == "" || !expText.test(Nombre)){
        alert("Nombre invalido")
        //alertify.error('El campo nombre es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 3px red";
    }
    else if(Apellido == "" || !expText.test(Apellido)){
        alert("Apellido invalido")
        //alertify.error('El campo apellido es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";  
        document.getElementById("input-apellido").style.boxShadow = "0 0 3px red";
    }
    else if(Cedula == "" || Cedula == 0 || !expCedula.test(Cedula)){
        alert("Cedula invalida")
        //alertify.error('El campo cedula es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff"; 
        document.getElementById("input-id").style.boxShadow = "0 0 5px red";
    }
        else if(Especialidad == "" || !expText.test(Especialidad)){
        alert("Debes seleccionar una especialidad")
        //alertify.error('El campo especialidad es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff"; 
        document.getElementById("input-especialidad").style.boxShadow = "0 0 5px red";
    }
    else if(Consultorio == "" || Consultorio == 0 || !expConsultorio.test(Consultorio)){
        alert("Consultorio invalido")
        //alertify.error('El campo consultorio es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 0 #ffff";  
        document.getElementById("input-consultorio").style.boxShadow = "0 0 5px red";
    }
    else if(Correo == "" || Correo == 0 || !expCorreo.test(Correo)){
        alert("Correo invalida")
        //alertify.error('El campo correo es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-consultorio").style.boxShadow = "0 0 0 #ffff"; 
        document.getElementById("input-correo").style.boxShadow = "0 0 5px red";
    }
    else{
        alert("El resgistro de datos fue exitoso")
        form__RegistroDoctor.reset()

        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-consultorio").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-correo").style.boxShadow = "0 0 0 #ffff";       

        addDoctorToList(Nombre, Apellido, Cedula, Especialidad, Consultorio, Correo);

        drawDoctores();
        
    }

});

function drawDoctores(){
    var Lista = getDoctoresList(),
    tbody = document.querySelector('#TabDatosDoctores tbody');
    tbody.innerHTML = '';
    for(var i=0; i< Lista.length; i++){
        var row = tbody.insertRow(i),
            nombrecell = row.insertCell(0),
            apellidocell = row.insertCell(1),
            idcell = row.insertCell(2),
            especialidadcell = row.insertCell(3),
            consultoriocell = row.insertCell(4),
            correocell = row.insertCell(5);

        nombrecell.innerHTML = Lista[i].nombre;
        apellidocell.innerHTML = Lista[i].apellido;
        idcell.innerHTML = Lista[i].id;        
        especialidadcell.innerHTML = Lista[i].especialidad;
        consultoriocell.innerHTML = Lista[i].consultorio;
        correocell.innerHTML = Lista[i].correo;

        tbody.appendChild(row);


    }

}