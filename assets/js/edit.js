const editForm = document.getElementById("editEmployee");


editForm.addEventListener('submit', handleUpdate);

const handleUpdate = () => {
    // let empName = document.getElementById("empName").value;
    // let empMail = document.getElementById("empMail").value;
    // console.log(editForm.serialize())
    console.log("hi")
    $.ajax({
        type: 'post',
        url: '/admin/update',
        data: editForm.serialize(),
    })
}