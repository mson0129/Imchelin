(function () {
    const body = document.body;
    const app = document.getElementById('app');
    const listMarkup = app.innerHTML;
    const auth = firebase.auth();
    let revision = 0;

    function get(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.timeout = 15000;
            xhr.onload = function () {
                if (xhr.status === 200) resolve(xhr.responseText);
                else reject(new Error('화면을 불러오지 못했습니다.'));
            };
            xhr.onerror = xhr.ontimeout = function () {
                reject(new Error('네트워크 연결을 확인해 주세요.'));
            };
            xhr.send();
        });
    }

    function showError(message) {
        let error = document.getElementById('authError');
        if (!error) {
            error = document.createElement('p');
            error.id = 'authError';
            error.setAttribute('role', 'alert');
            (app.querySelector('.btnWrapper') || app).appendChild(error);
        }
        error.textContent = message;
    }

    function loginError(error) {
        if (error.code === 'auth/popup-closed-by-user' ||
            error.code === 'auth/cancelled-popup-request') return;
        const message = error.code === 'auth/popup-blocked'
            ? '팝업이 차단됐습니다. 이 사이트의 팝업을 허용한 뒤 다시 로그인해 주세요.'
            : '로그인하지 못했습니다. 다시 시도해 주세요.';
        showError(message);
    }

    document.addEventListener('click', function (event) {
        if (!event.target.closest('#signOut')) return;
        auth.signOut().catch(function () {
            showError('로그아웃하지 못했습니다. 다시 시도해 주세요.');
        });
    });

    auth.onAuthStateChanged(function (user) {
        const currentRevision = ++revision;
        const nav = document.getElementById('nav');
        if (nav) nav.remove();

        body.classList.toggle('signin', !user);
        if (user) {
            // Restore the list replaced by the sign-in screen without recreating body.
            app.innerHTML = listMarkup;
            get('/data/nav.html').then(function (markup) {
                if (currentRevision !== revision) return;
                body.insertAdjacentHTML('beforeend', markup);
            }).catch(function (error) {
                if (currentRevision === revision) showError(error.message);
            });
        } else {
            app.innerHTML = '';
            get('/data/signin.html').then(function (markup) {
                // Ignore a delayed sign-in response after authentication completes.
                if (currentRevision !== revision) return;
                app.innerHTML = markup;
                const button = document.getElementById('signInWithGoogle');
                button.addEventListener('click', function () {
                    button.disabled = true;
                    const error = document.getElementById('authError');
                    if (error) error.remove();
                    auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
                        .catch(function (error) {
                            if (currentRevision === revision) loginError(error);
                        }).then(function () {
                            button.disabled = false;
                        });
                });
            }).catch(function (error) {
                if (currentRevision === revision) showError(error.message);
            });
        }
    }, function () {
        showError('로그인 상태를 확인하지 못했습니다. 새로고침해 주세요.');
    });

    auth.getRedirectResult().catch(loginError);
}());
