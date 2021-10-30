class PostAPI {
    static TOKEN = 'd32e74ac29fe26a554911fc03812a1e46df4c667a4c891fe98ad93ff068104c6';
    static  URL = 'https://gorest.co.in/public/v1/posts';
    static USER_ID = 65;

    static request(uri, method, data) {
        return fetch(`${this.url}${uri}`, {
            method,
            headers: {
                'Accept': 'application/xml',
                'Content-type': 'applicftion/json; charset=UTF-8',
                'Authorization': `Bearer ${this.TOKEN}`,
            },
            body: data ? JSON.stringify(data) : undefined,
        })
            .then((res) => {
                if (res.ok) {
                    if (res.status === 204) {
                        return {};
                    }

                    return res.json();
                }

                return res.json.then((data) => {
                    throw new Error('Post API Error: ' + JSON.stringify(data?.data, null, 4));
                })
            })
            .then((data) => {
                if (data) {
                    return data?.data;
                }
            });
    }

    static getList() {
        return fetch(this.URL)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Data not available");
            })
            .then((data) => data.data);
    }

    static delete(id) {
        return fetch(`${this.URL}/${id}`, {
            method: "DELETE",
            headers: this.HEADERS
        }).then((res) => {
            if (!res.ok || res.status !== 204) {
                throw new Error("Can not complete the task");
            }
        });
    }
}