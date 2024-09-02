if (sessionStorage.getItem('user') === null) {
    window.location.replace('http://127.0.0.1:5500/client/Login/login.html');
}

function renderBlog(post) {
    const parentElement = document.querySelector('.flex-fill');
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', logout);

    const container = document.createElement('div');
    container.classList.add('container', 'border', 'border-secondary', 'p-5', 'text-center', 'd-flex', 'flex-column');
    container.style.marginTop = '7vh';
    container.style.width = '50%';
    container.style.height = '80%';

    const backButton = document.createElement('img')
    backButton.src = '../images/Chevron - Left.png'
    backButton.addEventListener("click", renderBackToDahsboard)
    parentElement.appendChild(backButton);

    // Create h1 element for title
    const title = document.createElement('h1');
    title.classList.add('mt-5');
    title.textContent = post.title;

    const subText = document.createElement('h5');
    subText.classList.add('mt-5');
    subText.textContent = post.subText

    // Create h3 element for main text
    const mainText = document.createElement('h6');
    mainText.classList.add('mt-5');
    mainText.innerHTML = post.body

    // Create p element for author
    const author = document.createElement('p');
    if (post.showAuthor) {
        author.classList.add('text-end', 'mt-5');
        author.textContent = post.author;
    }

    // Append elements to the container
    container.appendChild(title);
    container.appendChild(subText)
    container.appendChild(mainText);

    if (post.showAuthor) {
        container.appendChild(author);
    }

    parentElement.appendChild(container);
}

function logout() {
    window.sessionStorage.setItem('user', null);
    window.location.replace('http://127.0.0.1:5500/client/Login/login.html');
}

async function fetchAndConditionallyRender() {
    const resp = await fetch('http://localhost:5000/blog/getBlogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: window.sessionStorage.getItem('user')
        })
    });

    let data = await resp.json();

    console.log(data.arr.length);

    if (data.arr.length > 0) {
        const nodata = document.getElementById('noData');
        nodata.style.display = 'none';
    } else {
        const lowerBody = document.getElementById('lowerBody');
        lowerBody.style.display = 'none';
    }

    let formattedDataOfPage = [];
    data.arr.forEach((obj) => {
        const newObj = {
            title: obj.title,
            url: obj.url,
            createdby: obj.owner, 
            createdAt: new Date(obj.createdAt).toLocaleDateString('en-GB'),
            status: obj.blogStatus,
            id: obj._id,
            subText: obj.subText,
            body: obj.body,
            author: obj.author,
            showAuthor: obj.showAuthor,
        };
        formattedDataOfPage.push(newObj);
    });
    console.log(formattedDataOfPage);

    const tableHead = document.getElementById('tableHead');
    const tableHeadRow = document.createElement('tr');

    const tableHeadTitles = Object.keys(formattedDataOfPage[0]);
    const schema = ['title', 'url', 'createdby', 'createdAt', 'status'];
    tableHeadTitles.forEach(titleText => {
        if (schema.includes(titleText)) {
            const th = document.createElement('th');
            th.setAttribute('scope', 'col');
            th.textContent = titleText;
            tableHeadRow.appendChild(th);
        }
    });

    tableHead.appendChild(tableHeadRow);

    const tbody = document.getElementById('tbody');

    // Inside the fetchAndConditionallyRender function, after adding the table rows
    formattedDataOfPage.forEach((blogObj) => {
        const tableBodyRow = document.createElement('tr');
        tableHeadTitles.forEach(key => {
            if (schema.includes(key)) {
                const td = document.createElement('td');

                if (key === 'title') {
                    const dropdownButtonHTML = `
                    <div class="btn-group mx-2" role="group">
                        <button type="button" class="btn border dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                        </button>
                        <ul class="dropdown-menu ">
                            <li><a class="dropdown-item" href="#" id="previewbt-${blogObj.id}">Preview</a></li>
                            <li><a class="dropdown-item" href="#" id="deletebt-${blogObj.id}" style="color: red;">Delete</a></li>
                        </ul>
                    </div>`;

                    // Set the innerHTML of the title cell
                    td.innerHTML = `${blogObj[key]} ${dropdownButtonHTML}`;
                    // Attach event listener to the delete button
                    const deleteButton = td.querySelector(`#deletebt-${blogObj.id}`);
                    deleteButton.addEventListener('click', () => {
                        deleteBlog(blogObj.id);
                    });

                    const previewButton = td.querySelector(`#previewbt-${blogObj.id}`);
                    previewButton.addEventListener('click', () => {
                        renderBlog(blogObj)
                    });

                } else {
                    // For other keys, simply set the text content
                    td.textContent = blogObj[key];
                }
                tableBodyRow.appendChild(td);
            }
        });

        tbody.appendChild(tableBodyRow);
    });

    const records = document.getElementById('records')
    records.innerText = `${data.arr.length} records`
}

function deleteBlog(blog) {
    fetch('http://localhost:5000/blog/deleteBlog', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: blog
        })
    })
        .then((resp) => {
            if (resp.ok) {
                alert("Blog Successfully Deleted")
            }
            else {
                alert('An error Occured');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    window.location.reload();
}

function goToAddBlogPage() {
    window.location.replace('http://127.0.0.1:5500/client/Edit-Page/editPage-3.html');
}

function renderBackToDahsboard() {
    window.location.replace('http://127.0.0.1:5500/client/Landing-Page/landingPage-1.html');
}

const addPageOfNoData = document.getElementById('AddPageOfNoData');
addPageOfNoData.addEventListener('click', goToAddBlogPage)

const addPageBtnOfTable = document.getElementById('AddPageOfData');
addPageBtnOfTable.addEventListener('click', goToAddBlogPage)

const contentLibraryBtn = document.getElementById('content_library')
contentLibraryBtn.addEventListener('click', goToAddBlogPage);

const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', logout);


function searchTitles() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const tableRows = document.querySelectorAll('#tbody tr');

    tableRows.forEach(row => {
        const titleCell = row.querySelector('td:first-child');
        const titleText = titleCell.textContent.toLowerCase();

        if (titleText.includes(searchInput)) {
            row.style.display = ''; 
        } else {
            row.style.display = 'none'; 
        }
    });
}

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', searchTitles);


fetchAndConditionallyRender();
