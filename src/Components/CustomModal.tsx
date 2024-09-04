import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';

interface CustomModalProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

const CustomModal: React.FC<CustomModalProps> = ({ 
  visible, 
  title, 
  children, 
  onCancel, 
  onConfirm 
}) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContainer, { transform: [{ scale }] }]}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.body}>{children}</View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.button}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} style={styles.button}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  body: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
