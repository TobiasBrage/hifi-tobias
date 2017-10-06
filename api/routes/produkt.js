const db = require('../config/sql').connect();
var MD5 = function(s){function L(k,d){return(k<<d)|(k>>>(32-d))}function K(G,k){var I,d,F,H,x;F=(G&2147483648);H=(k&2147483648);I=(G&1073741824);d=(k&1073741824);x=(G&1073741823)+(k&1073741823);if(I&d){return(x^2147483648^F^H)}if(I|d){if(x&1073741824){return(x^3221225472^F^H)}else{return(x^1073741824^F^H)}}else{return(x^F^H)}}function r(d,F,k){return(d&F)|((~d)&k)}function q(d,F,k){return(d&k)|(F&(~k))}function p(d,F,k){return(d^F^k)}function n(d,F,k){return(F^(d|(~k)))}function u(G,F,aa,Z,k,H,I){G=K(G,K(K(r(F,aa,Z),k),I));return K(L(G,H),F)}function f(G,F,aa,Z,k,H,I){G=K(G,K(K(q(F,aa,Z),k),I));return K(L(G,H),F)}function D(G,F,aa,Z,k,H,I){G=K(G,K(K(p(F,aa,Z),k),I));return K(L(G,H),F)}function t(G,F,aa,Z,k,H,I){G=K(G,K(K(n(F,aa,Z),k),I));return K(L(G,H),F)}function e(G){var Z;var F=G.length;var x=F+8;var k=(x-(x%64))/64;var I=(k+1)*16;var aa=Array(I-1);var d=0;var H=0;while(H<F){Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=(aa[Z]| (G.charCodeAt(H)<<d));H++}Z=(H-(H%4))/4;d=(H%4)*8;aa[Z]=aa[Z]|(128<<d);aa[I-2]=F<<3;aa[I-1]=F>>>29;return aa}function B(x){var k="",F="",G,d;for(d=0;d<=3;d++){G=(x>>>(d*8))&255;F="0"+G.toString(16);k=k+F.substr(F.length-2,2)}return k}function J(k){k=k.replace(/rn/g,"n");var d="";for(var F=0;F<k.length;F++){var x=k.charCodeAt(F);if(x<128){d+=String.fromCharCode(x)}else{if((x>127)&&(x<2048)){d+=String.fromCharCode((x>>6)|192);d+=String.fromCharCode((x&63)|128)}else{d+=String.fromCharCode((x>>12)|224);d+=String.fromCharCode(((x>>6)&63)|128);d+=String.fromCharCode((x&63)|128)}}}return d}var C=Array();var P,h,E,v,g,Y,X,W,V;var S=7,Q=12,N=17,M=22;var A=5,z=9,y=14,w=20;var o=4,m=11,l=16,j=23;var U=6,T=10,R=15,O=21;s=J(s);C=e(s);Y=1732584193;X=4023233417;W=2562383102;V=271733878;for(P=0;P<C.length;P+=16){h=Y;E=X;v=W;g=V;Y=u(Y,X,W,V,C[P+0],S,3614090360);V=u(V,Y,X,W,C[P+1],Q,3905402710);W=u(W,V,Y,X,C[P+2],N,606105819);X=u(X,W,V,Y,C[P+3],M,3250441966);Y=u(Y,X,W,V,C[P+4],S,4118548399);V=u(V,Y,X,W,C[P+5],Q,1200080426);W=u(W,V,Y,X,C[P+6],N,2821735955);X=u(X,W,V,Y,C[P+7],M,4249261313);Y=u(Y,X,W,V,C[P+8],S,1770035416);V=u(V,Y,X,W,C[P+9],Q,2336552879);W=u(W,V,Y,X,C[P+10],N,4294925233);X=u(X,W,V,Y,C[P+11],M,2304563134);Y=u(Y,X,W,V,C[P+12],S,1804603682);V=u(V,Y,X,W,C[P+13],Q,4254626195);W=u(W,V,Y,X,C[P+14],N,2792965006);X=u(X,W,V,Y,C[P+15],M,1236535329);Y=f(Y,X,W,V,C[P+1],A,4129170786);V=f(V,Y,X,W,C[P+6],z,3225465664);W=f(W,V,Y,X,C[P+11],y,643717713);X=f(X,W,V,Y,C[P+0],w,3921069994);Y=f(Y,X,W,V,C[P+5],A,3593408605);V=f(V,Y,X,W,C[P+10],z,38016083);W=f(W,V,Y,X,C[P+15],y,3634488961);X=f(X,W,V,Y,C[P+4],w,3889429448);Y=f(Y,X,W,V,C[P+9],A,568446438);V=f(V,Y,X,W,C[P+14],z,3275163606);W=f(W,V,Y,X,C[P+3],y,4107603335);X=f(X,W,V,Y,C[P+8],w,1163531501);Y=f(Y,X,W,V,C[P+13],A,2850285829);V=f(V,Y,X,W,C[P+2],z,4243563512);W=f(W,V,Y,X,C[P+7],y,1735328473);X=f(X,W,V,Y,C[P+12],w,2368359562);Y=D(Y,X,W,V,C[P+5],o,4294588738);V=D(V,Y,X,W,C[P+8],m,2272392833);W=D(W,V,Y,X,C[P+11],l,1839030562);X=D(X,W,V,Y,C[P+14],j,4259657740);Y=D(Y,X,W,V,C[P+1],o,2763975236);V=D(V,Y,X,W,C[P+4],m,1272893353);W=D(W,V,Y,X,C[P+7],l,4139469664);X=D(X,W,V,Y,C[P+10],j,3200236656);Y=D(Y,X,W,V,C[P+13],o,681279174);V=D(V,Y,X,W,C[P+0],m,3936430074);W=D(W,V,Y,X,C[P+3],l,3572445317);X=D(X,W,V,Y,C[P+6],j,76029189);Y=D(Y,X,W,V,C[P+9],o,3654602809);V=D(V,Y,X,W,C[P+12],m,3873151461);W=D(W,V,Y,X,C[P+15],l,530742520);X=D(X,W,V,Y,C[P+2],j,3299628645);Y=t(Y,X,W,V,C[P+0],U,4096336452);V=t(V,Y,X,W,C[P+7],T,1126891415);W=t(W,V,Y,X,C[P+14],R,2878612391);X=t(X,W,V,Y,C[P+5],O,4237533241);Y=t(Y,X,W,V,C[P+12],U,1700485571);V=t(V,Y,X,W,C[P+3],T,2399980690);W=t(W,V,Y,X,C[P+10],R,4293915773);X=t(X,W,V,Y,C[P+1],O,2240044497);Y=t(Y,X,W,V,C[P+8],U,1873313359);V=t(V,Y,X,W,C[P+15],T,4264355552);W=t(W,V,Y,X,C[P+6],R,2734768916);X=t(X,W,V,Y,C[P+13],O,1309151649);Y=t(Y,X,W,V,C[P+4],U,4149444226);V=t(V,Y,X,W,C[P+11],T,3174756917);W=t(W,V,Y,X,C[P+2],R,718787259);X=t(X,W,V,Y,C[P+9],O,3951481745);Y=K(Y,h);X=K(X,E);W=K(W,v);V=K(V,g)}var i=B(Y)+B(X)+B(W)+B(V);return i.toLowerCase()};

module.exports = function (app) {
    //edit
    app.post('/edit/user', function (req, res) {
        let userId = req.body.id;
        let userForName = req.body.name;
        let userName = req.body.username;
        let userMail = req.body.mail;
        db.execute(`UPDATE bruger SET navn = '${userForName}', mail = '${userMail}', brugernavn = '${userName}' WHERE id = '${userId}'`, (err, rows) => {
            if (err) {
                res.json({"message": "editedError"})
            }
            else {
                res.json({"message": "editedSuccess"})
            }
        })
    });

    app.post('/edit/password', function (req, res) {
        let userId = req.body.id;
        let userOldPassword = req.body.oldPassword;
        let userNewPassword = req.body.newPassword;
        let userNewRepPassword = req.body.newRepeatPassword;
        let userOldPasswordMd5 = (MD5(userOldPassword));
        let userNewPasswordMd5 = (MD5(userNewPassword));
        let matchPassword = `SELECT COUNT(*) as 'user' FROM bruger WHERE id = '${userId}' AND kodeord = '${userOldPasswordMd5}'`;        

        if(userOldPassword.length > 4) {
            db.execute(matchPassword, function (err, resultPassword) {
                if (resultPassword[0].user == 1) {
                    if(userNewPassword.length > 4) {
                        if(userNewPassword == userNewRepPassword) {
                            db.execute(`UPDATE bruger SET kodeord = '${userNewPasswordMd5}' WHERE id = '${userId}'`, (err, rows) => {
                                if (err) {
                                    res.json({"message": "changePasswordError"});
                                }
                                else {
                                    res.json({"message": "changePasswordSuccess"});
                                }
                            })
                        } else {
                            res.json({"message": "noNewMatchPassword"});
                        }
                    } else {
                        res.json({"message": "shortNewPassword"});
                    }
                } else {
                    res.json({"message": "noMatchPassword"});
                }
            })
        } else {
            res.json({"message": "shortOldPassword"});
        }
    });

    app.post('/edit/product', function (req, res) {
        let productId = req.body.id;
        let productImg = req.body.image;
        let productTitle = req.body.title;
        let productDescription = req.body.description;
        db.execute(`UPDATE produkter SET beskrivelse = '${productDescription}', navn = '${productTitle}', billede = '${productImg}' WHERE id = ${productId}`, (err, rows) => {
            if (err) {
                res.json({"message": "editedError"})
            }
            else {
                res.json({"message": "editedSuccess"})
            }
        })
    });

    //add

    app.get('/add/category/:id', function (req, res) {
        let categoryId = req.params.id.replace("id=", "");
        db.query(`INSERT INTO kategori (id, navn) VALUES (null, '${categoryId}')`, function (err, data) {
            res.send('categoryAdded');
        })
    });

    app.post('/add/product', function (req, res) {
        let productImg = req.body.image;
        let productTitle = req.body.title;
        let productDescription = req.body.description;
        let productCategory = req.body.category;
        let productPrice = req.body.price;
        let productStock = req.body.stock;
        let productId = req.body.productid;
        db.execute(`INSERT INTO produkter (id, varenr, navn, billede, beskrivelse, fk_kategori, pris, beholdning) VALUES (null, '${productId}', '${productTitle}', '${productImg}', '${productDescription}', '${productCategory}', '${productPrice}', '${productStock}')`, (err, rows) => {
            if (err) {
                res.json({"message": "productError"})
            }
            else {
                res.json({"message": "productAdded"})
            }
        })
    });

    app.post('/add/user', function (req, res) {
        let userForName = req.body.userforname;
        let username = req.body.username;
        let userMail = req.body.usermail;
        let userPermission = req.body.userpermission;
        let userPassword = req.body.userpassword;
        let userPasswordMd5 = (MD5(userPassword));
        db.execute(`INSERT INTO bruger (id, navn, mail, brugernavn, kodeord, fk_tilladelse) VALUES (null, '${userForName}', '${userMail}', '${username}', '${userPasswordMd5}', '${userPermission}')`, (err, rows) => {
            if (err) {
                res.json({"message": "userError"})
            }
            else {
                res.json({"message": "userAdded"})
            }
        })
    });

    //distinct

    app.get('/product/images', function (req, res) {
        db.query(`select DISTINCT billede from produkter`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/user/permissions', function (req, res) {
        db.query(`select DISTINCT id, navn from tilladelse`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/product/categories', function (req, res) {
        db.query(`select DISTINCT id, navn from kategori`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/product/lastid', function (req, res) {
        db.query(`select varenr from produkter order by varenr desc limit 1`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/user/:id', function (req, res) {
        let userId = req.params.id.replace("id=", "");
        db.query(`select 
        bruger.id as 'id',
        bruger.navn as 'navn',
        bruger.mail as 'mail',
        bruger.brugernavn 'brugernavn',
        bruger.kodeord as 'kodeord',
        tilladelse.navn as 'tilladelse'
        from bruger
        inner join tilladelse on bruger.fk_tilladelse = tilladelse.id
        where bruger.id = ${userId}`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/user', function (req, res) {
        db.query(`select 
        bruger.id as 'id',
        bruger.navn as 'navn',
        bruger.mail as 'mail',
        bruger.brugernavn 'brugernavn',
        bruger.kodeord as 'kodeord',
        tilladelse.navn as 'tilladelse'
        from bruger
        inner join tilladelse on bruger.fk_tilladelse = tilladelse.id`, function (err, data) {
            res.send(data);
        })
    });

    //delete

    app.get('/delete/message/:id', function (req, res) {
        let messageId = req.params.id.replace("id=", "");
        db.execute(`delete from kontakt where id = ${messageId}`, (err, rows) => {
            res.send('deletedSuccess');
        })
    });

    app.get('/delete/product/:id', function (req, res) {
        let productId = req.params.id.replace("id=", "");
        db.execute(`delete from produkter where id = ${productId}`, (err, rows) => {
            res.send('deletedSuccess');
        })
    });

    app.get('/delete/user/:id', function (req, res) {
        let userId = req.params.id.replace("id=", "");
        db.execute(`delete from bruger where id = ${userId}`, (err, rows) => {
            res.send('deletedSuccess');
        })
    });

    app.get('/delete/category/:id', function (req, res) {
        let categoryId = req.params.id.replace("id=", "");
        db.query(`delete from kategori where id = ${categoryId}`, function (err, data) {
            res.send('deletedSuccess');
        })
    });

    app.get('/category/:id', function (req, res) {
        let catId = req.params.id.replace("id=", "");
        db.query(`select 
        produkter.id as 'id', 
        produkter.varenr as 'varenr',
        produkter.navn as 'navn',
        produkter.billede as 'billede',
        produkter.beskrivelse as 'beskrivelse',
        kategori.navn as 'kategori',
        produkter.pris as 'pris',
        produkter.beholdning as 'beholdning'
        from produkter 
        inner join kategori on produkter.fk_kategori = kategori.id
        where kategori.id = ${catId}`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/category', function (req, res) {
        db.query(`select
        produkter.id as 'id', 
        produkter.varenr as 'varenr',
        produkter.navn as 'navn',
        produkter.billede as 'billede',
        produkter.beskrivelse as 'beskrivelse',
        kategori.navn as 'kategori',
        produkter.pris as 'pris',
        produkter.beholdning as 'beholdning'
        from produkter 
        inner join kategori on produkter.fk_kategori = kategori.id`, 
        function (err, data) {
            res.send(data);
        })
    });

    app.get('/messages', function (req, res) {
        db.query(`select * from kontakt`, 
        function (err, data) {
            res.send(data);
        })
    });

    app.get('/search/:src', function (req, res) {
        let srcId = req.params.src.replace("src=", "");
        db.query(`select 
        produkter.id as 'id',
        produkter.varenr as 'varenr',
        produkter.navn as 'navn',
        produkter.billede as 'billede',
        produkter.beskrivelse as 'beskrivelse',
        kategori.navn as 'kategori',
        produkter.pris as 'pris',
        produkter.beholdning as 'beholdning'
        from produkter 
        inner join kategori on produkter.fk_kategori = kategori.id
        WHERE produkter.navn LIKE '%${srcId}%'`, function (err, data) {
            res.send(data);
        })
    });

    app.get('/product/:id', function (req, res) {
        let productId = req.params.id.replace("id=", "");
        if(productId == 'rand') {
            db.query(`select * from produkter order by rand() limit 1`, function (err, data) {
                res.send(data);
            })
        } else {
            db.query(`select 
            produkter.varenr as 'varenr',
            produkter.navn as 'navn',
            produkter.billede as 'billede',
            produkter.beskrivelse as 'beskrivelse',
            kategori.navn as 'kategori',
            produkter.pris as 'pris',
            produkter.beholdning as 'beholdning'
            from produkter 
            inner join kategori on produkter.fk_kategori = kategori.id
            where produkter.id = ${productId}`, function (err, data) {
                res.send(data);
            })
        }
    });

    app.post('/add/message', function (req, res) {
        let values = [];
        values.push(req.body.name);
        values.push(req.body.mail);
        values.push(req.body.message);
        db.execute('insert into kontakt set id = null, navn = ?, mail = ?, besked = ?', values, (err, rows) => {
            if (err) {
                res.json({"message": "messageError"})
            }
            else {
                res.json({"message": "messageSent"})
            }
        })
    });

    app.post('/login', function (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let passwordEnc = (MD5(req.body.password));
        let loginUsername = `SELECT COUNT(*) as 'user' FROM bruger WHERE brugernavn = '${username}'`;
        let loginPassword = `SELECT COUNT(*) as 'user' FROM bruger WHERE brugernavn = '${username}' AND kodeord = '${passwordEnc}'`;
        let getUserId = `SELECT id FROM bruger WHERE brugernavn = '${username}'`;
        if(username.length > 4) {
            db.execute(loginUsername, function (err, resultUsername) {
                if (resultUsername[0].user == 1) {
                    if(password.length > 4) {
                        db.execute(loginPassword, function (err, resultPassword) {
                            if (resultPassword[0].user == 1) {
                                db.execute(getUserId, function (err, userData) {
                                    res.json({"message": "userLoggedIn", "userId": userData[0].id});
                                })
                            } else {
                                res.json({"message": "wrongPassword"});
                            }
                        })
                    } else {
                        res.json({"message": "shortPassword"});
                    }
                } else {
                    res.json({"message": "wrongUsername"});
                }
            })
        } else {
            res.json({"message": "shortUsername"});
        }
    })
}
