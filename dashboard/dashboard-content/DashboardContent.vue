<template>
    <section class="dashboard-content">

        <!-- =========================
         Welcome
    ========================== -->
        <div class="dashboard-welcome">

            <div class="welcome-text">
                <h2>
                    {{ greeting }}, {{ user?.username || 'User' }}! 👋
                </h2>

                <p>
                    Here's what's happening with your system today.
                </p>
            </div>

            <div class="welcome-date">
                <span class="date-icon">▣</span>

                <div>
                    <strong>17 Sep 2026</strong>
                    <small>Thursday</small>
                </div>
            </div>

        </div>


        <!-- =========================
         Statistics
    ========================== -->
        <div class="statistics-grid">

            <div v-for="stat in statistics" :key="stat.title" class="stat-card">

                <div class="stat-icon" :class="`stat-icon-${stat.type}`">
                    <span v-if="stat.icon === 'user'">●</span>
                    <span v-else-if="stat.icon === 'role'">◆</span>
                    <span v-else-if="stat.icon === 'permission'">⌕</span>
                    <span v-else>⚙</span>
                </div>

                <div class="stat-info">

                    <span class="stat-title">
                        {{ stat.title }}
                    </span>

                    <strong class="stat-value">
                        {{ stat.value }}
                    </strong>

                    <div class="stat-change">
                        <span :class="{
                            'change-neutral': stat.change === '0%'
                        }">
                            ↑ {{ stat.change }}
                        </span>

                        <small>
                            {{ stat.description }}
                        </small>
                    </div>

                </div>

            </div>

        </div>


        <!-- =========================
         Main Dashboard Grid
    ========================== -->
        <div class="dashboard-grid">

            <!-- =========================
           Activity Chart
      ========================== -->
            <div class="dashboard-card activity-card">

                <div class="card-header">

                    <div>
                        <h3>
                            User & Role Activity
                        </h3>

                        <p>
                            System activity over the last 6 months
                        </p>
                    </div>

                    <select class="period-select">
                        <option>Last 6 months</option>
                        <option>Last 12 months</option>
                    </select>

                </div>

                <div class="bar-chart">

                    <div class="chart-y-axis">
                        <span>50</span>
                        <span>40</span>
                        <span>30</span>
                        <span>20</span>
                        <span>10</span>
                        <span>0</span>
                    </div>

                    <div class="chart-area">

                        <div class="chart-lines">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>

                        <div class="bars">

                            <div v-for="item in activityData" :key="item.month" class="bar-group">

                                <div class="bar-wrapper">

                                    <div class="bar bar-users" :style="{
                                        height: `${(item.users / maxActivityValue) * 100}%`
                                    }"></div>

                                    <div class="bar bar-assignments" :style="{
                                        height: `${(item.assignments / maxActivityValue) * 100}%`
                                    }"></div>

                                </div>

                                <span class="bar-label">
                                    {{ item.month }}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="chart-legend">

                    <span>
                        <i class="legend-dot users"></i>
                        Users
                    </span>

                    <span>
                        <i class="legend-dot assignments"></i>
                        Role Assignments
                    </span>

                </div>

            </div>


            <!-- =========================
           Role Distribution
      ========================== -->
            <div class="dashboard-card role-card">

                <div class="card-header">
                    <div>
                        <h3>User Role Distribution</h3>
                        <p>Current users by role</p>
                    </div>

                    <NuxtLink to="/roles" class="view-link">
                        View all
                    </NuxtLink>
                </div>

                <div class="role-chart-area">

                    <div class="donut-chart">

                        <div class="donut-center">
                            <strong>28</strong>
                            <span>Total Users</span>
                        </div>

                    </div>

                    <div class="role-legend">

                        <div v-for="role in roleDistribution" :key="role.name" class="role-legend-item">

                            <div class="role-name">
                                <i class="role-dot" :class="`role-${role.type}`"></i>

                                <span>{{ role.name }}</span>
                            </div>

                            <strong>{{ role.count }}</strong>

                            <small>
                                {{ role.percentage }}%
                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <!-- =========================
         Tables
    ========================== -->
        <div class="dashboard-grid">

            <!-- Recent Users -->
            <div class="dashboard-card table-card">

                <div class="card-header">

                    <div>
                        <h3>Recent Users</h3>
                        <p>Recently added users</p>
                    </div>

                    <NuxtLink to="/users" class="view-link">
                        View all
                    </NuxtLink>

                </div>

                <div class="table-wrapper">

                    <table>

                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Created</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr v-for="item in recentUsers" :key="item.id">

                                <td>
                                    {{ item.id }}
                                </td>

                                <td>
                                    <div class="table-user">
                                        <div class="mini-avatar">
                                            {{ item.username.charAt(0).toUpperCase() }}
                                        </div>

                                        <span>
                                            {{ item.username }}
                                        </span>
                                    </div>
                                </td>

                                <td>
                                    {{ item.role }}
                                </td>

                                <td>
                                    <span class="status-badge" :class="{
                                        active: item.status === 'Active',
                                        inactive: item.status === 'Inactive'
                                    }">
                                        {{ item.status }}
                                    </span>
                                </td>

                                <td>
                                    {{ item.createdAt }}
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>


            <!-- Recent Activity -->
            <div class="dashboard-card activity-list-card">

                <div class="card-header">

                    <div>
                        <h3>Recent Activity</h3>
                        <p>Latest system activities</p>
                    </div>

                    <span class="activity-status">
                        ● Live
                    </span>

                </div>

                <div class="activity-list">

                    <div v-for="activity in recentActivities" :key="activity.title + activity.time"
                        class="activity-item">

                        <div class="activity-icon" :class="`activity-${activity.type}`">
                            <span v-if="activity.type === 'user'">
                                ●
                            </span>

                            <span v-else-if="activity.type === 'role'">
                                ◆
                            </span>

                            <span v-else-if="activity.type === 'permission'">
                                🔑
                            </span>

                            <span v-else>
                                ⚙
                            </span>
                        </div>

                        <div class="activity-details">

                            <strong>
                                {{ activity.title }}
                            </strong>

                            <p>
                                {{ activity.description }}
                            </p>

                            <small>
                                {{ activity.time }}
                            </small>

                        </div>

                    </div>

                </div>

            </div>

        </div>


        <!-- =========================
         Bottom Section
    ========================== -->
        <div class="dashboard-grid bottom-grid">

            <!-- Role Distribution Bars -->
            <div class="dashboard-card">

                <div class="card-header">

                    <div>
                        <h3>User Roles</h3>
                        <p>Users grouped by role</p>
                    </div>

                    <NuxtLink to="/roles" class="view-link">
                        Manage
                    </NuxtLink>

                </div>

                <div class="role-bars">

                    <div v-for="role in roleDistribution" :key="role.name" class="role-bar-item">

                        <div class="role-bar-header">

                            <span>
                                {{ role.name }}
                            </span>

                            <strong>
                                {{ role.count }}
                            </strong>

                        </div>

                        <div class="role-progress">
                            <div :class="`role-progress-${role.type}`" :style="{
                                width: `${role.percentage}%`
                            }"></div>
                        </div>

                    </div>

                </div>

            </div>


            <!-- Quick Actions -->
            <div class="dashboard-card">

                <div class="card-header">

                    <div>
                        <h3>Quick Actions</h3>
                        <p>Frequently used actions</p>
                    </div>

                </div>

                <div class="quick-actions">

                    <NuxtLink v-for="action in quickActions" :key="action.path" :to="action.path" class="quick-action">

                        <div class="quick-action-icon" :class="`quick-${action.type}`">
                            <span v-if="action.icon === 'user'">●</span>
                            <span v-else-if="action.icon === 'role'">◆</span>
                            <span v-else-if="action.icon === 'permission'">⌕</span>
                            <span v-else>⚙</span>
                        </div>

                        <div class="quick-action-text">

                            <strong>
                                {{ action.label }}
                            </strong>

                            <small>
                                {{ action.description }}
                            </small>

                        </div>

                        <span class="quick-arrow">
                            →
                        </span>

                    </NuxtLink>

                </div>

            </div>

        </div>


        <!-- =========================
         Tip
    ========================== -->
        <div class="dashboard-tip">

            <div class="tip-icon">
                ✦
            </div>

            <div>
                <strong>
                    Keep your system organized
                </strong>

                <p>
                    Regularly review users, roles, and permissions
                    to keep your access control secure and up to date.
                </p>
            </div>

        </div>

    </section>
</template>

<script setup lang="ts">
import { useDashboardContent } from './DashboardContent'

const {
    user,
    statistics,
    activityData,
    roleDistribution,
    recentUsers,
    recentActivities,
    quickActions,
    maxActivityValue,
    greeting
} = useDashboardContent()
</script>