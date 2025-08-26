import Swal from 'sweetalert2'

class sweetalertPop{

    handleError(title, des){
        let timerInterval;
            Swal.fire({
            title: title,
            html: des,
            timer: 2000,
            icon : 'error',
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
            });
    }

}

export default sweetalertPop