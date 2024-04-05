<template>
    <a-table :columns="columns" :row-key="record => record.login.uuid" :data-source="dataSource"
        :pagination="pagination" :loading="loading" @change="handleTableChange">
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">{{ text.first }} {{ text.last }}</template>
        </template>
    </a-table>
</template>
<script setup>
import { computed } from 'vue';
import { usePagination } from 'vue-request';
import axios from 'axios';
const columns = [
    {
        title: '题号',
        dataIndex: 'name',
        sorter: false,
        width: '10%',
    },
    {
        title: '题目',
        dataIndex: 'problems',
        width: '30%',
    },
    {
        title: 'Tag',
        dataIndex: 'Tag',
    },
    {
        title: '难度',
        dataIndex: 'difficulty',
        sorter: true
    },
    {
        title: '通过率',
        dataIndex: 'passRate',
        sorter: true
    }   
];
const queryData = {
    results: [
        {
            "gender": "female",
            "name": {
                "title": "Mrs",
                "first": "Minnie",
                "last": "Brewer"
            },
            "location": {
                "street": {
                    "number": 1334,
                    "name": "Cherry St"
                },
                "city": "Ventura",
                "state": "Montana",
                "country": "United States",
                "postcode": 66100,
                "coordinates": {
                    "latitude": "87.6793",
                    "longitude": "7.5183"
                },
                "timezone": {
                    "offset": "-7:00",
                    "description": "Mountain Time (US & Canada)"
                }
            },
            "email": "minnie.brewer@example.com",
            "login": {
                "uuid": "b18221e8-9e3a-409a-bd4d-95a552aaaf28",
                "username": "ticklishmeercat384",
                "password": "donner",
                "salt": "6nPcKOp2",
                "md5": "105300f8ae6005688f78a591dbd27236",
                "sha1": "5443755f97d86b1b7a91781ef7371ec431cf0f30",
                "sha256": "9c81c952abc10dadd5360de19f7e9e4776152ae8e87c0595309f307728ee0c21"
            },
            "dob": {
                "date": "1982-11-03T14:34:57.296Z",
                "age": 41
            },
            "registered": {
                "date": "2008-09-01T21:06:47.115Z",
                "age": 15
            },
            "phone": "(366) 791-5170",
            "cell": "(962) 985-5978",
            "id": {
                "name": "SSN",
                "value": "686-94-0360"
            },
            "picture": {
                "large": "https://randomuser.me/api/portraits/women/32.jpg",
                "medium": "https://randomuser.me/api/portraits/med/women/32.jpg",
                "thumbnail": "https://randomuser.me/api/portraits/thumb/women/32.jpg"
            },
            "nat": "US"
        }
    ]
}
/*
const {
    data: dataSource,
    run,
    loading,
    current,
    pageSize,
} = usePagination(queryData, {
    formatResult: res => res.data.results,
    pagination: {
        currentKey: 'page',
        pageSizeKey: 'results',
    },
});
const pagination = computed(() => ({
    total: 200,
    current: current.value,
    pageSize: pageSize.value,
}));
const handleTableChange = (pag, filters, sorter) => {
    run({
        results: pag.pageSize,
        page: pag?.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
    });
};
*/
</script>