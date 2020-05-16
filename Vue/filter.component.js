new Vue({
    el: "#product-filter",
    data: {
        collapseAll: true,
        filterGroups: [
            {
                id: 1,
                name: "fg-name-1",
                isOpen: true,
                isOpenClass: "collapse in",
                caretClass: "fa fa-caret-down pull-right",
                filters: [
                    {
                        id: 1,
                        name: "f-name-1",
                        isSelected: true
                    },
                    {
                        id: 2,
                        name: "f-name-2",
                        isSelected: false
                    }
                ]
            },
            {
                id: 2,
                name: "fg-name-2",
                isOpen: true,
                isOpenClass: "collapse in",
                caretClass: "fa fa-caret-down pull-right",
                filters: [
                    {
                        id: 3,
                        name: "f-name-3",
                        isSelected: true
                    }
                ]
            }
        ]
    },
    computed: {
        // ...
    },
    methods: {
        clearFilters: function () {
            this.filterGroups.forEach(function(fg, fgi) {
                fg.filters.forEach(function(f, fi) {
                    f.isSelected = false;
                });
            });
        },
        collapseFilters: function() {
            this.filterGroups.forEach(function (fg, fgi) {
                fg.isOpen = false;
                fg.isOpenClass = fg.isOpen ? "collapse in" : "collapse";
                fg.caretClass = fg.isOpen ? "fa fa-caret-down pull-right" : "fa fa-caret-up pull-right";
            });

            this.collapseAll = false;
        },
        openFilters: function() {
            this.filterGroups.forEach(function (fg, fgi) {
                fg.isOpen = true;
                fg.isOpenClass = fg.isOpen ? "collapse in" : "collapse";
                fg.caretClass = fg.isOpen ? "fa fa-caret-down pull-right" : "fa fa-caret-up pull-right";
            });

            this.collapseAll = true;
        },
        toggleFilterGroup: function (filterGroup) {
            filterGroup.isOpen = !filterGroup.isOpen;
            filterGroup.isOpenClass = filterGroup.isOpen ? "collapse in" : "collapse";
            filterGroup.caretClass = filterGroup.isOpen ? "fa fa-caret-down pull-right" : "fa fa-caret-up pull-right";
        }
    }
})