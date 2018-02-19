var galleryService = (function() {
    const transformUrl = str => (str.indexOf('http://') !== 0) ? `http://${str}` : `${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD');

    let modifiedData = arr => {
        return arr.map(item => {
            return {
                url: transformUrl(item.url),
                name: transformName(item.name),
                description: transformDescription(item.description),
                date: getFormattedDate(item.date),
                id: item.id,
                isShow: false
            }
        })
    };

    let templateES6 = item => {
        return `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" 
                            data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                            alt="${item.name}" 
                            src="${item.url}" data-holder-rendered="true" 
                            style="height: 225px; width: 100%; display: block;">
                        <div class="card-body">
                            <div class="text-muted">${item.name}</div>\
                            <p class="card-text">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn btn-danger js-id-${item.id}">Удалить</div>
                                <small class="text-muted">${item.date}</small>
                            </div>
                        </div>
                    </div>
		        </div>
	            </div></div>`;
    };

    let sortNameAsc = (a, b) => a.name > b.name ? 1 : -1;
    let sortNameDesc = (a, b) => a.name < b.name ? 1 : -1;
    let sortDateAsc = (a, b) => new Date(a.date) < new Date(b.date) ? 1 : -1;
    let sortDateDesc = (a, b) => new Date(a.date) > new Date(b.date) ? 1 : -1;

    return {
        modifiedData: modifiedData,
        getGalleryItemHTML: templateES6,
        sortNameAsc: sortNameAsc,
        sortNameDesc: sortNameDesc,
        sortDateAsc: sortDateAsc,
        sortDateDesc: sortDateDesc
    }
}());