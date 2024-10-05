var contacts = [];
function showContactList(companyId) {
    $.ajax({
        method: "GET",
        contentType: 'application/json',
        url: "https://linkedin-contacts.vercel.app/api/users?companyId=" + companyId,
        dataType: "json",
    })
        .done(function (response) {
            console.log(' ==== response ===', response);
            if (response.users) {
                const contactList = response.users;
                // console.log('contactList', contactList);
                let contactListHtml = '';
                for (let i = 0; i < contactList.length; i++) {
                    contactListHtml += '<a href="' + contactList[i].link + '" class="list-group-item" target="_blank">' +
                        '                                <div class="media">' +
                        '                                    <div class="pull-left">' +
                        '                                        <img class="img-circle" src="' + (contactList[i].picture ? contactList[i].picture : './img/user.svg') + '" alt="' + contactList[i].name + '">' +
                        '                                    </div>' +
                        '                                    <div class="media-body">' +
                        '                                        <h4 class="media-heading">' + contactList[i].name + '</h4>' +
                        '                                        <div class="media-content">' +
                        '                                            <i class="fa fa-map-marker"> ' + contactList[i].position + '</i> ' +
                        '                                            <ul class="list-unstyled">' +
                        '                                               <li>' + contactList[i].company + '</li>' +
                        '                                            </ul>' +
                        '                                        </div>' +
                        '                                    </div>' +
                        '                                </div>' +
                        '                            </a>';
                }
                $('#contactList').html(contactListHtml);
            }
        });
}
$( document ).ready(function() {
    $.ajax({
        method: "GET",
        contentType: 'application/json',
        url: "https://linkedin-contacts.vercel.app/api/companies",
        dataType: "json",
    })
        .done(function (response) {
            if (response.companies) {
                contacts = response.companies;
                let navContactsHtml = '';
                for (let i = 0; i < contacts.length; i++) {
                    navContactsHtml += '<li ' + (i === 0 ? 'class="active"' : '') + ' data-id="' + contacts[i].id + '"><a href="#">' + contacts[i].name + '</a></li>'
                }
                $('#navContacts').html($(navContactsHtml));
                showContactList(contacts[0].id);
            }
        });
    // chrome.storage.local.get(["contacts"]).then((result) => {
    //
    //     if (result.contacts) {
    //         contacts = result.contacts;
    //         let navContactsHtml = '';
    //         for (let i = 0; i < contacts.length; i++) {
    //             navContactsHtml += '<li ' + (i === 0 ? 'class="active"' : '') +'><a href="#">' + contacts[i] + '</a></li>'
    //         }
    //         $('#navContacts').html($(navContactsHtml));
    //         showContactList(contacts[0]);
    //     }
    // });

    $(document.body).on('click', '#navContacts li' ,function(e){
        e.preventDefault();
        $('#navContacts li').removeClass('active');
        $(this).addClass('active');
        showContactList($(this).attr("data-id"));
    });
});
