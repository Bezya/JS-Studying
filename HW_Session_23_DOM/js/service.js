var galleryService = (function() {
    const transformUrl = str => (str.indexOf('http://') !== 0) ? `http://${str}` : `${str}`;

    const transformName = name => `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

    const transformDescription = str => (str.length > 15) ? `${str.substring(0, 15)}...` : str;

    const getFormattedDate = date => moment(date).format('YYYY/MM/DD hh:mm');

    function addShowAttribute(arr) {
        return arr.map((item) => ({...item, isShow: false }));
    }

    function sortDateDesc(a, b) {
        return a.date > b.date ? 1 : -1;
    }

    function sortDateAsc(a, b) {
        return a.date < b.date ? 1 : -1;
    }

    function templateES6(item) {
        return `<div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" 
                            data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                            alt="${transformName(item.name)}" 
                            src="${transformUrl(item.url)}" data-holder-rendered="true" 
                            style="height: 225px; width: 100%; display: block;">
                        <div class="card-body">
                            <div class="text-muted">${transformName(item.name)}</div>\
                            <p class="card-text">${transformDescription(item.description)}</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">View</button>
                                    <button type="button" class="btn btn-outline-secondary">Edit</button>
                                </div>
                                <div class="btn btn-danger js-id-${item.id}">Удалить</div>
                                <small class="text-muted">${getFormattedDate(item.date)}</small>
                            </div>
                        </div>
                    </div>
		        </div>
	            </div></div>`;
    }

    return {
        addShowAttribute: addShowAttribute,
        sortDateAsc: sortDateAsc,
        sortDateDesc: sortDateDesc,
        getGalleryItemHTML: templateES6
    }
}());