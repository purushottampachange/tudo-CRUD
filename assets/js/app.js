

const cl = console.log;

const tudoForm = document.getElementById("tudoForm");

const tudoInput = document.getElementById("tudoInput");

const tudoContainer = document.getElementById("tudoContainer");

const submitBtn = document.getElementById("submitBtn");

const updateBtn = document.getElementById("updateBtn");



let tudoArr = [];

if (localStorage.getItem("tudoArr")) {

    tudoArr = JSON.parse(localStorage.getItem("tudoArr"));
}




const uuid = () => {
    return String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(
        /[xy]/g,
        character => {
            const random = (Math.random() * 16) | 0
            const value = character === 'x' ? random : (random & 0x3) | 0x8
            return value.toString(16)
        }
    )
}


const LocalStorageUpdate = (arr) => {

    localStorage.setItem("tudoArr", JSON.stringify(tudoArr));

}


const CreateLists = (arr) => {

    let res = "";

    arr.forEach(tudo => {

        res += ` <li class="list-group-item d-flex justify-content-between" id="${tudo.id}">
                                <strong>${tudo.tudoItem}</strong>
                                <div>
                                    <button class="btn btn-sm btn-outline-success" onclick = onEdit(this)>Edit</button>
                                    <button class="btn btn-sm btn-outline-danger" onclick = onRemove(this)>Remove</button>
                                </div>
                            </li>`
    })

    tudoContainer.innerHTML = res;
}


CreateLists(tudoArr);


const CreateLi = (obj) => {

    let li = document.createElement("li");

    li.id = obj.id;

    li.className = "list-group-item d-flex justify-content-between";

    li.innerHTML = `<strong>${obj.tudoItem}</strong>
                                <div>
                                    <button class="btn btn-sm btn-outline-success" onclick = onEdit(this) >Edit</button>
                                    <button class="btn btn-sm btn-outline-danger"onclick = onRemove(this)>Remove</button>
                                </div>`;

    tudoContainer.append(li);
}


const onEdit = (ele) => {

    let EDIT_ID = ele.closest("li").id;

    localStorage.setItem("EDIT_ID", EDIT_ID);

    let EDIT_OBJ = tudoArr.find(tudo => tudo.id === EDIT_ID);

    tudoInput.value = EDIT_OBJ.tudoItem;

    submitBtn.classList.add("d-none");

    updateBtn.classList.remove("d-none");

}


const onUpdate = () => {

    let UPDATE_ID = localStorage.getItem("EDIT_ID");

    let UPDATE_OBJ = {

        tudoItem: tudoInput.value,
        id: UPDATE_ID
    }

    tudoForm.reset();

    let UPDATE_IND = tudoArr.findIndex(tudo => tudo.id === UPDATE_ID);

    tudoArr[UPDATE_IND] = UPDATE_OBJ;

    LocalStorageUpdate(tudoArr);

    let li = document.getElementById(UPDATE_ID).firstElementChild;

    li.innerText = UPDATE_OBJ.tudoItem;

    submitBtn.classList.remove("d-none");

    updateBtn.classList.add("d-none");

    localStorage.removeItem("EDIT_ID");

    Swal.fire({
        title: "Tudo Updated Successfully",
        icon: "success",
        timer: 1500
    });

}


const onRemove = (ele) => {


    Swal.fire({
        title: "Do you want to Delete Tudo ?",
        showCancelButton: true,
        confirmButtonText: "Delete",
    }).then((result) => {
        if (result.isConfirmed) {

            let REMOVE_ID = ele.closest("li").id;

            let REMOVE_IND = tudoArr.findIndex(tudo => tudo.id === REMOVE_ID);

            tudoArr.splice(REMOVE_IND, 1);

            LocalStorageUpdate(tudoArr);

            ele.closest("li").remove();

            Swal.fire({
                title: "Tudo Deleted Successfully",
                icon: "success",
                timer: 1500
            });

        }
    });
}




const onSubmit = (eve) => {

    eve.preventDefault();

    let tudoObj = {

        tudoItem: tudoInput.value,
        id: uuid()
    }

    tudoForm.reset();

    tudoArr.push(tudoObj);

    LocalStorageUpdate(tudoArr);

    CreateLi(tudoObj);

    Swal.fire({
        title: "Tudo Added Successfully",
        icon: "success",
        timer: 1500
    });


}

tudoForm.addEventListener("submit", onSubmit);

updateBtn.addEventListener("click", onUpdate);

































































