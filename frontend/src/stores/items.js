import { defineStore } from 'pinia'

export const useItemsStore = defineStore('items', {
    state: () => {
        return {
            backendUrl: "localhost",
            backendPort: "3000",
            links: {
                linkCreateLead: '/create_lead',
                linkCreateContact: '/create_contact',
                linkCreateCompany: '/create_company',
                linkHealthCheck: '/health_check',
            },
        }
    },
    getters: {
        backendAddress: (state) => 'http://' + state.backendUrl + ':' + state.backendPort + '/api',
        createLinks: (state) => [ state.links.linkCreateLead, state.links.linkCreateContact, state.links.linkCreateCompany ],
    },
    actions: {
        changeBackendUrl(url) {
            if (url && typeof url === 'string') {
                this.backendUrl = url;
            }
        },
        changeBackendPort(port) {
            if (port && (typeof port === 'string' || typeof port === 'number')) {
                this.backendPort = port.toString();
            }
        },
        $reset() {
            this.backendUrl = 'localhost';
            this.backendPort = '3000';
        },
        createLead() {

        }
    },
});