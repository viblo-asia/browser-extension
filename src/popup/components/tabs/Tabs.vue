<template>
    <div class="tabs">
        <el-radio-group v-model="activePane" class="tabs-list">
            <el-radio-button
                v-for="(pane, index) in panes"
                :key="index"
                :label="pane.name"
                class="tab-item"
            >
                {{ pane.label }}
                <span v-if="pane.badge > 0" class="tab-badge">
                    {{ pane.badge }}
                </span>
            </el-radio-button>
        </el-radio-group>

        <div class="tab-content">
            <slot/>
        </div>
    </div>
</template>

<script>
    import _find from 'lodash/find';
    import _flow from 'lodash/flow';
    import _filter from 'lodash/fp/filter';
    import _indexOf from 'lodash/fp/indexOf';
    import _orderBy from 'lodash/fp/orderBy';

    export default {
        props: {
            initialActivePane: String
        },

        data() {
            return {
                panes: [],
                activePane: this.initialActivePane
            };
        },

        watch: {
            activePane(current, prev) {
                this.emitEnter(current);
                this.emitLeave(prev);
            }
        },

        mounted() {
            this.emitEnter(this.initialActivePane);
        },

        methods: {
            addPane(pane) {
                const index = this.getPaneIndex(pane);

                this.panes = [
                    ...this.panes.slice(0, index),
                    pane,
                    ...this.panes.slice(index)
                ];
            },

            removePane(pane) {
                const index = this.getPaneIndex(pane);

                this.panes = [...this.panes.slice(0, index), ...this.panes.slice(index + 1)];
            },

            getPaneIndex(pane) {
                return _flow(
                    _filter(child => child.$options.componentName === 'TabPane'),
                    _orderBy('index', 'asc'),
                    _indexOf(pane)
                )(this.$children);
            },

            emitEnter(pane) {
                this.emitPaneEvent('enter', pane);
            },

            emitLeave(pane) {
                this.emitPaneEvent('leave', pane);
            },

            emitPaneEvent(event, name) {
                const pane = _find(this.panes, { name });
                if (pane) {
                    pane.$emit(event);
                }
            }
        }
    };
</script>

<style lang="scss">
    .tabs-list {
        display: flex;
        width: 100%;
        margin-bottom: 1rem;

        .tab-item {
            flex: 1;

            .el-radio-button__inner {
                width: 100%;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
            }

            .tab-badge {
                border-radius: 3px;
                margin-left: 5px;
                padding: 3px 5px;
                font-size: 12px;
                font-weight: 600;
                background-color: #409EFF;
                color: #FFF;
            }

            &.is-active {
                .tab-badge {
                    background-color: #FFF;
                    color: #409EFF;
                }
            }
        }
    }
</style>
