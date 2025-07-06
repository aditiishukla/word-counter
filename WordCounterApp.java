import javax.swing.*;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class WordCounterApp extends JFrame{

    public JTextArea inputTextArea;
    public JLabel wordCountLabel;
    public JLabel charCountLabel;
    public JLabel paragraphCountLabel;
    public JButton countButton;

    public WordCounterApp(){
        setTitle("WORD COUNTER");
        setSize(500,400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);
        initComponents();
        addListeners();
    }

    public void initComponents(){
        JPanel mainPanel = new JPanel(new BorderLayout(10, 10)); //spacing
        mainPanel.setBorder(BorderFactory.createEmptyBorder(10, 10, 10, 10)); //padding

        inputTextArea = new JTextArea(10, 30);
        inputTextArea.setFont(new Font("Ariel", Font.PLAIN, 15));
        inputTextArea.setLineWrap(true);
        inputTextArea.setWrapStyleWord(true);
        JScrollPane scrollPane = new JScrollPane(inputTextArea);

        TitledBorder scrollPaneBorder = BorderFactory.createTitledBorder("ENTER THE TEXT:");
        scrollPaneBorder.setTitleFont(new Font("Arial", Font.PLAIN, 14));
        scrollPane.setBorder(scrollPaneBorder);
        
        inputTextArea.setBackground(new Color(247, 202, 201));
        inputTextArea.setForeground(Color.BLACK);

        JPanel countPanel = new JPanel(new GridLayout(3, 1, 5, 5));
        countPanel.setBackground(new Color(247, 202, 201));

        wordCountLabel = new JLabel("WORDS: 0");
        wordCountLabel.setFont(new Font("Arial", Font.BOLD, 14));

        charCountLabel = new JLabel("CHARACTERS: 0");
        charCountLabel.setFont(new Font("Arial", Font.BOLD, 14));

        paragraphCountLabel = new JLabel("PARAGRAPHS: 0");
        paragraphCountLabel.setFont(new Font("Arial", Font.BOLD, 14));

        countPanel.add(wordCountLabel);
        countPanel.add(charCountLabel);
        countPanel.add(paragraphCountLabel);

        countButton = new JButton("COUNT");
        countButton.setFont(new Font("Arial", Font.BOLD, 17));

        countButton.setBackground(new Color(216, 191, 216));

        mainPanel.add(scrollPane, BorderLayout.CENTER);
        mainPanel.add(countPanel, BorderLayout.EAST);
        mainPanel.add(countButton, BorderLayout.SOUTH);

        add(mainPanel);
    }

    public void addListeners(){
        countButton.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e){
                String text = inputTextArea.getText();
                updateCounts(text);
            }
        });
    }

    public void updateCounts(String text){
        //chars count
        int charCount = text.length();
        charCountLabel.setText("Characters: " + charCount);
        //word count
        String[] words = text.trim().split("\\s+");
        int wordCount = 0;
        if(text.trim().isEmpty()){
            wordCount = 0;
        } else{
            wordCount = words.length;
        }
        wordCountLabel.setText("Words: " + wordCount);
        //para count
        String[] paragraphs = text.split("\\n+");
        int paragraphCount = 0;
        for(String p : paragraphs){
            if(!p.trim().isEmpty()){
                paragraphCount++;
            }
        }
        paragraphCountLabel.setText("Paragraphs: " + paragraphCount);
    }

    public static void main(String[] args){
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new WordCounterApp().setVisible(true);
            }
        });
    }
}
