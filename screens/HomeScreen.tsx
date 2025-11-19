import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

type HomeScreenProps = {
  navigation?: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          if (navigation?.reset) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Auth' }],
            });
          }
        },
      },
    ]);
  };

  const goalsData = [
    { id: 1, title: 'Complete React Native Course', completed: false },
    { id: 2, title: 'Build 3 Mobile Apps', completed: true },
    { id: 3, title: 'Master TypeScript', completed: false },
    { id: 4, title: 'Learn Firebase', completed: false },
  ];

  const recommendationsData = [
    { id: 1, title: 'Advanced Hooks', progress: 65, icon: '🎣' },
    { id: 2, title: 'State Management', progress: 45, icon: '📦' },
    { id: 3, title: 'Performance Tips', progress: 80, icon: '⚡' },
  ];

  const recentActivity = [
    { id: 1, title: 'Completed "Getting Started"', time: '2 hours ago', icon: '✅' },
    { id: 2, title: 'Started new learning path', time: '1 day ago', icon: '🚀' },
    { id: 3, title: 'Earned achievement badge', time: '3 days ago', icon: '🏆' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Enhanced Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👤</Text>
            </View>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Welcome Back!</Text>
            <Text style={styles.userName}>John Developer</Text>
            <Text style={styles.userEmail}>john@example.com</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Quick Stats Bar */}
      <View style={styles.quickStatsBar}>
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>12</Text>
          <Text style={styles.quickStatLabel}>Streak</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>28</Text>
          <Text style={styles.quickStatLabel}>Goals</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.quickStat}>
          <Text style={styles.quickStatValue}>15</Text>
          <Text style={styles.quickStatLabel}>Achieved</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
          onPress={() => setSelectedTab('overview')}
        >
          <Text style={[styles.tabText, selectedTab === 'overview' && styles.tabTextActive]}>Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'goals' && styles.tabActive]}
          onPress={() => setSelectedTab('goals')}
        >
          <Text style={[styles.tabText, selectedTab === 'goals' && styles.tabTextActive]}>Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'activity' && styles.tabActive]}
          onPress={() => setSelectedTab('activity')}
        >
          <Text style={[styles.tabText, selectedTab === 'activity' && styles.tabTextActive]}>Activity</Text>
        </TouchableOpacity>
      </View>

      {/* Overview Tab */}
      {selectedTab === 'overview' && (
        <>
          {/* Featured Card */}
          <View style={styles.section}>
            <View style={styles.featuredCard}>
              <Text style={styles.featureIconLarge}>🚀</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Start Learning Today</Text>
                <Text style={styles.featureDesc}>Begin your journey to mastering React Native with our comprehensive guides and tutorials.</Text>
                <TouchableOpacity style={styles.featureButton} onPress={() => Alert.alert('Explore', 'Opening learning resources...')}>
                  <Text style={styles.featureButtonText}>Explore Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Quick Actions Grid */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Settings', 'Opening settings...')}>
                <Text style={styles.actionIcon}>⚙️</Text>
                <Text style={styles.actionText}>Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Profile', 'Opening profile...')}>
                <Text style={styles.actionIcon}>👤</Text>
                <Text style={styles.actionText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Notifications', 'Opening notifications...')}>
                <Text style={styles.actionIcon}>🔔</Text>
                <Text style={styles.actionText}>Notifications</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionCard} onPress={() => Alert.alert('Help', 'Opening help center...')}>
                <Text style={styles.actionIcon}>❓</Text>
                <Text style={styles.actionText}>Help</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Statistics */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>📚</Text>
                <Text style={styles.statNumber}>42</Text>
                <Text style={styles.statLabel}>Lessons</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>✅</Text>
                <Text style={styles.statNumber}>28</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>⏳</Text>
                <Text style={styles.statNumber}>14</Text>
                <Text style={styles.statLabel}>In Progress</Text>
              </View>
            </View>
          </View>
        </>
      )}

      {/* Goals Tab */}
      {selectedTab === 'goals' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Goals</Text>
          {goalsData.map((goal) => (
            <TouchableOpacity
              key={goal.id}
              style={styles.goalItem}
              onPress={() => Alert.alert('Goal', `${goal.completed ? 'Mark incomplete' : 'Mark complete'}: ${goal.title}?`)}
            >
              <View style={[styles.goalCheckbox, goal.completed && styles.goalCheckboxCompleted]}>
                {goal.completed && <Text style={styles.goalCheckboxText}>✓</Text>}
              </View>
              <Text style={[styles.goalText, goal.completed && styles.goalTextCompleted]}>{goal.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recommendations Tab */}
      {selectedTab === 'activity' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended For You</Text>
          {recommendationsData.map((rec) => (
            <View key={rec.id} style={styles.recommendationCard}>
              <View style={styles.recHeader}>
                <Text style={styles.recIcon}>{rec.icon}</Text>
                <View style={styles.recContent}>
                  <Text style={styles.recTitle}>{rec.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${rec.progress}%` }]} />
                    </View>
                    <Text style={styles.recPercent}>{rec.progress}%</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.recButton} onPress={() => Alert.alert('Course', `Taking action on ${rec.title}...`)}>
                <Text style={styles.recButtonText}>Continue Learning</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Recent Activity Timeline */}
      {selectedTab === 'overview' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentActivity.map((item) => (
            <View key={item.id} style={styles.activityItem}>
              <View style={styles.activityIndicator}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{item.title}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
              <Text style={styles.activityArrow}>›</Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer Spacing */}
      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarSection: {
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginTop: 2,
  },
  userEmail: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 20,
  },
  quickStatsBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  quickStat: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF',
  },
  quickStatLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
    alignItems: 'center',
  },
  tabActive: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
  },
  tabTextActive: {
    color: '#007AFF',
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIconLarge: {
    fontSize: 50,
    marginRight: 12,
    marginTop: -4,
  },
  featureIcon: {
    fontSize: 40,
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#666',
    marginBottom: 10,
    lineHeight: 18,
  },
  featureButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  featureButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  goalCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalCheckboxCompleted: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  goalCheckboxText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  goalText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1a1a1a',
  },
  goalTextCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  recHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  recIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 3,
  },
  recPercent: {
    fontSize: 12,
    fontWeight: '700',
    color: '#007AFF',
    marginLeft: 8,
  },
  recButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 2,
  },
  recButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e0e0e0',
  },
  activityIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityIcon: {
    fontSize: 18,
  },
  activityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#007AFF',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  activityArrow: {
    fontSize: 16,
    color: '#ccc',
    marginLeft: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    marginTop: 20,
  },
});
