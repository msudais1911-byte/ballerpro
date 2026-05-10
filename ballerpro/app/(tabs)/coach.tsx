import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';
import { colors, spacing, fontSizes, borderRadius } from '@/utils/styles';
import { Send, MessageCircle, Bot, User } from 'lucide-react-native';

const SAMPLE_MESSAGES = [
  { id: '1', type: 'bot', text: 'Hello! I\'m your AI Football Coach. How can I help you improve your game today?' },
  { id: '2', type: 'user', text: 'I need help with my shooting accuracy' },
  { id: '3', type: 'bot', text: 'Great! Let\'s work on your shooting. Here are some key techniques:\n\n1. Foot placement\n2. Follow through\n3. Shot timing\n\nWould you like detailed instructions on any of these?' },
];

export default function CoachScreen() {
  const [messages, setMessages] = useState(SAMPLE_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([
        ...messages,
        { id: Date.now().toString(), type: 'user', text: inputText },
        { id: (Date.now() + 1).toString(), type: 'bot', text: 'I\'m analyzing your question. How can I help you improve?' },
      ]);
      setInputText('');
    }
  };

  return (
    <View style={[styles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}>
          <View style={styles.avatarBot}>
            <Bot size={24} color={colors.text} />
          </View>
          <View>
            <Text style={styles.headerTitle}>AI Football Coach</Text>
            <Text style={styles.headerStatus}>Always available</Text>
          </View>
        </View>
      </View>

      {/* Chat Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.type === 'user' && styles.messageWrapperUser,
            ]}
          >
            {message.type === 'bot' && (
              <View style={styles.avatarSmall}>
                <Bot size={16} color={colors.text} />
              </View>
            )}
            <View
              style={[
                styles.messageBubble,
                message.type === 'user' && styles.messageBubbleUser,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.type === 'user' && styles.messageTextUser,
                ]}
              >
                {message.text}
              </Text>
            </View>
            {message.type === 'user' && (
              <View style={styles.avatarSmall}>
                <User size={16} color={colors.text} />
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask your AI coach..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendMessage}
          disabled={!inputText.trim()}
        >
          <Send size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingTop: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarBot: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerStatus: {
    fontSize: fontSizes.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  avatarSmall: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.darkSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageBubbleUser: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  messageText: {
    fontSize: fontSizes.base,
    color: colors.text,
    lineHeight: 20,
  },
  messageTextUser: {
    color: colors.text,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: colors.darkSecondary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.text,
    fontSize: fontSizes.base,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
