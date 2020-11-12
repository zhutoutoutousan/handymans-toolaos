import java.awt.*;
import javax.swing.*;
import javax.swing.JComponent;

class HelloComponent extends JComponent {
    /**
     *
     */
    private static final long serialVersionUID = 1L;

    public void paintComponent(Graphics g) {
        g.drawString( "Hello, Java!", 125, 95);
    }

    public static void main ( String[] args) {
        JFrame frame = new JFrame( "Hello, Java! ");
        JLabel label = new JLabel("Hello, Java!", JLabel.CENTER); 
        frame.add(label);
        frame.add( new HelloComponent() );
        frame.setSize( 300, 300);
        frame.setVisible( true );
    }
}