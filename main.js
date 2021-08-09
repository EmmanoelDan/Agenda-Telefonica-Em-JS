//Emmanoel Dantas
$(function(){

	var opp = "A"; // Resposavel em realizar operações.
	var indice = -1;
	var tbContatos = localStorage.getItem("tbContatos");// 
	tbContatos = JSON.parse(tbContatos);// Convertendo um string para objeto

	if (tbContatos == null) // Caso não haja informações, inicia-se um vetor vazio
		 tbContatos = [];
	
		 // CRUD
	function Adicionar() {		//Função responsavél em adicionar os contatos
		var con = GetContato("Nome", $("#txtNome").val())

		if (con != null ){		// verifica se o contato ja esta salvo
			alert("Nome ja passui na lista/ Nome inexistente!");
			return
		}
		
		var contato = JSON.stringify({  // se não estiver salvo, ele adiciona o novo contato a lista
			Nome 		:$("#txtNome").val(),
			Telefone 	:$("#txtTelefone").val(),
			Operadora 	:$("#txtOperadora").val()
		
		})


		console.log($("txtNome"), $("txtTelefone"), $("txtOperadora"));
		tbContatos.push(contato);
		localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
		alert("Contato Salvo");
		return true;
	}
	
	function Editar(){ 			//função para editar os contatos
		tbContatos[indice] = JSON.stringify({
				Nome :$("#txtNome").val(),
				Telefone :$("#txtTelefone").val(),
				Operadora :$("#txtOperadora").val()
			});
		localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
		alert("Contato Editado");
		opp = "A";
		return true;
	}
	function Listar(){   	// essa função vai listar todos os contatos salvos
		$("#tblListar").html("");
		$("#tblListar").html(
			"<thead>"+
			"	<tr>"+
			"<th></th>"+
			"	<th>Nome</th>"+
			"	<th>Telefone</th>"+
			"	<th>Operadora</th>"+
			"	</tr>"+
			"</thead>"+
			"<tbody>"+
			"</tbody>"
			);

		for(var i in tbContatos){
			var con = JSON.parse(tbContatos[i]);
		  	$("#tblListar tbody").append("<tr>"+
									 	 "	<td><img src='edit.png' alt='"+i+"' class='btnEditar'/><img src='delete.png' alt='"+i+"' class='btnExcluir'/></td>" + 
										  "	<th>"+con.Nome+"</th>"+
										  "	<th>"+con.Telefone+"</th>"+
										  "	<th>"+con.Operadora+"</th>"+
		  								 "</tr>");
		}
	}

	function Excluir(){			// função para excluir
		tbContatos.splice(indice, 1);
		localStorage.setItem("tbContatos", JSON.stringify(tbContatos));
		alert("Contato excluído.");
	}
	function GetContato (propriedade, valor){
		var con = null;
        for (var item in tbContatos) {
            var i = JSON.parse(tbContatos[item]);
            if (i[propriedade] == valor)
                con = i;
        }
        return con;
	}
	Listar()
	$("#adaCadastro").on("submit",function(){
		if(opp == "A")
			return Adicionar();
		else
			return Editar()	;
	});

	$("#tblListar").on("click", ".btnEditar", function(){
		opp = "E";
		indice = parseInt($(this).attr("alt"));
		var con = JSON.parse(tbContatos[indice]);
		$("#txtNome").val(con.Nome);
		$("#txtTelefone").val(con.Telefone);
		$("#txtOperadora").val(con.Operadora);
		$("#txtNome").focus();
	
	});

	$("#tblListar").on("click", ".btnExcluir", function(){
		indice = parseInt($(this).attr("alt"));
		Excluir();
		Listar();
	});
});
