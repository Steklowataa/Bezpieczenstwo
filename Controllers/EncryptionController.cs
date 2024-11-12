using Microsoft.AspNetCore.Mvc;
using EncryptionMvcApp.Models;

namespace EncryptionMvcApp.Controllers
{
    public class EncryptionController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Encrypt(string originalText)
        {
            if (string.IsNullOrEmpty(originalText))
            {
                ViewBag.Error = "Please enter some text to encrypt.";
                return View("Index");
            }

            var model = new EncryptionModel
            {
                OriginalText = originalText,
                EncryptedText = EncryptionModel.Encrypt(originalText)
            };

            return View("Index", model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Decrypt(string encryptedText)
        {
            if (string.IsNullOrEmpty(encryptedText))
            {
                ViewBag.Error = "Please enter text to decrypt.";
                return View("Index");
            }

            var model = new EncryptionModel
            {
                EncryptedText = encryptedText,
                DecryptedText = EncryptionModel.Decrypt(encryptedText)
            };

            return View("Index", model);
        }
    }
}
