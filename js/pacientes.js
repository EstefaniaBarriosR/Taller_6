var ListaPacientes = [];

function addPacienteToList(p_nombre, p_apellido, p_id, p_telefono, p_edad, p_especialidad){
    var NewPaciente = {
        nombre: p_nombre,
        apellido: p_apellido,
        id: p_id,
        telefono: p_telefono,
        edad: p_edad, 
        especialidad: p_especialidad
    };
    console.log(NewPaciente);
    ListaPacientes.push(NewPaciente);
    
    guardarPacientes(ListaPacientes);
}

function getPacientesList(){
    var ListaGuardada = localStorage.getItem('localListaPacientes'); 
    if(ListaGuardada == null){
        ListaPacientes = [];
    } else{
        ListaPacientes = JSON.parse(ListaGuardada);
    }
    return ListaPacientes;
}

function guardarPacientes(lista_pacientes){
    localStorage.setItem('localListaPacientes', JSON.stringify(lista_pacientes));
}


const form_Persona = document.getElementById('form__RegistroCliente');

drawPacientes();

form_Persona.addEventListener("submit", (e) => {
    e.preventDefault();

    // variables
    const Nombre = document.getElementById("input-nombre").value;
    const Apellido = document.getElementById("input-apellido").value;
    const Cedula = document.getElementById("input-id").value;
    const Telefono = document.getElementById("input-telefono").value;
    const Edad = document.getElementById("input-edad").value;
    const Especialidad = document.getElementById("input-especialidad").value;
    
    
    // expresiones regulares

    const expText =  /^([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+)(\s+([A-Za-zÑñÁáÉéÍíÓóÚú]+['\-]{0,1}[A-Za-zÑñÁáÉéÍíÓóÚú]+))*$/; 
    const expCedula = /^([0-9]{5,10})*$/;
    const expTelefono = /^([0-9]{7,10})*$/;
    const expEdad = /^[0-9]{1,3}$/;

    
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
    else if(Telefono == "" || Telefono == 0 || !expTelefono.test(Telefono)){
        alert("Telefono invalido")
        //alertify.error('El campo telefono es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 5px red";
    }
    else if(Edad == "" || Edad == 0 || !expEdad.test(Edad)){
        alert("Edad invalida")
        //alertify.error('El campo edad es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-edad").style.boxShadow = "0 0 5px red";
    }
    else if(Especialidad == "" || !expText.test(Especialidad)){
        alert("Debes seleccionar una especialidad")
        //alertify.error('El campo esoecialidad es invalido');
        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-edad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 5px red";
    }
    else{
        alert("El resgistro de datos fue exitoso")
        form__RegistroCliente.reset()

        document.getElementById("input-nombre").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-apellido").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-id").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-telefono").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-edad").style.boxShadow = "0 0 0 #ffff";
        document.getElementById("input-especialidad").style.boxShadow = "0 0 0 #ffff";

        addPacienteToList(Nombre, Apellido, Cedula, Telefono, Edad, Especialidad);

        drawPacientes();
        
    }

});

function drawPacientes(){
    var Lista = getPacientesList(),
    tbody = document.querySelector('#TabDatosPacientes tbody');
    tbody.innerHTML = '';
    for(var i=0; i< Lista.length; i++){
        var row = tbody.insertRow(i),
            nombrecell = row.insertCell(0),
            apellidocell = row.insertCell(1),
            idcell = row.insertCell(2),
            telefonocell = row.insertCell(3),
            edadcell = row.insertCell(4),
            especialidadcell = row.insertCell(5);

        nombrecell.innerHTML = Lista[i].nombre;
        apellidocell.innerHTML = Lista[i].apellido;
        idcell.innerHTML = Lista[i].id;
        telefonocell.innerHTML = Lista[i].telefono;
        edadcell.innerHTML = Lista[i].edad;
        especialidadcell.innerHTML = Lista[i].especialidad;

        tbody.appendChild(row);

    }

}