import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

type HomeScreenProps = {
  navigation?: any;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const handleLogout = () => {
    // Logout logic will be handled by parent navigation
    if (navigation?.reset) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome! 👋</Text>
          <Text style={styles.subGreeting}>user@example.com</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured</Text>
        <View style={styles.featuredCard}>
          <View style={styles.featureIcon}>📱</View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>React Native App</Text>
            <Text style={styles.featureDesc}>Build amazing mobile apps</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>⚙️</Text>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>🔔</Text>
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard}>
            <Text style={styles.actionIcon}>ℹ️</Text>
            <Text style={styles.actionText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Login Successful</Text>
            <Text style={styles.activityTime}>Just now</Text>
          </View>
        </View>
        <View style={styles.activityItem}>
          <View style={styles.activityDot} />
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>Account Created</Text>
            <Text style={styles.activityTime}>Today</Text>
          </View>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>42</Text>
            <Text style={styles.statLabel}>Tasks</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>15</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>In Progress</Text>
          </View>
        </View>
      </View>
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
    paddingVertical: 20,
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    fontSize: 14,
    color: '#666',
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
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 10,
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
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#999',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '31%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
