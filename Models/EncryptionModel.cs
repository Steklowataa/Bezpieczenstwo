using System;
using System.Collections.Generic;

namespace EncryptionMvcApp.Models
{
    public class EncryptionModel
    {
        public string OriginalText { get; set; }
        public string EncryptedText { get; set; }
        public string DecryptedText { get; set; }

        static char[,] square = {
            {'A', 'Ą', 'B', 'C', 'Ć', 'D'},
            {'E', 'Ę', 'F', 'G', 'H', 'I'},
            {'J', 'K', 'L', 'Ł', 'M', 'N'},
            {'Ń', 'O', 'Ó', 'P', 'R', 'S'},
            {'Ś', 'T', 'U', 'W', 'Y', 'Z'},
            {'Ź', 'Ż', 'Q', 'V', 'X', ' '},
        };

        static Dictionary<char, string> charToCoords = new Dictionary<char, string>();
        static Dictionary<string, char> coordsToChar = new Dictionary<string, char>();

        static EncryptionModel()
        {
            InitializeDictionaries();
        }

        private static void InitializeDictionaries()
        {
            for (int i = 0; i < 6; i++)
            {
                for (int j = 0; j < 6; j++)
                {
                    char letter = square[i, j];
                    string coords = $"{i + 1}{j + 1}";
                    charToCoords[letter] = coords;
                    coordsToChar[coords] = letter;
                }
            }
        }

        public static string Encrypt(string text)
        {
            text = text.ToUpper();
            string result = "";

            foreach (char letter in text)
            {
                if (charToCoords.ContainsKey(letter))
                {
                    result += charToCoords[letter];
                }
            }

            return result;
        }

        public static string Decrypt(string encryptedText)
        {
            string result = "";

            for (int i = 0; i < encryptedText.Length; i += 2)
            {
                string coords = encryptedText.Substring(i, 2);
                if (coordsToChar.ContainsKey(coords))
                {
                    result += coordsToChar[coords];
                }
            }
            return result;
        }
    }
}
