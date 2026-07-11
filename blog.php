<?php
declare(strict_types=1);

$pageTitle = 'Blog';
$pageDescription = "Read the latest stories, updates, and reflections from the TEERTHA team.";
$activePage = 'blog';

require __DIR__ . '/includes/page-header.php';
?>

<main id="main-content">
    <section class="page-hero" style="min-height: 40vh; display: flex; align-items: center; justify-content: center; background-image: url('assets/images/temple-blog-hero.jpg'); background-size: cover; background-position: center; position: relative; color: white;">
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.3);"></div>
        <div class="container" style="text-align: center; position: relative; z-index: 1; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">

            <h1 style="font-family: 'Cinzel', serif; font-size: clamp(2rem, 5vw, 3.5rem); margin-bottom: 1rem;">Blog</h1>
            <p style="color: #f3f4f6; max-width: 600px; margin: 0 auto; font-size: 1.125rem;">Reflections on heritage, preservation, and the meaning of our journeys.</p>
        </div>
    </section>

    <section class="section section--white">
        <div class="container" style="max-width: 800px; margin: 0 auto; padding-top: 2rem;">
            <article>
                <div style="margin-bottom: 3rem;">
                    <h2 style="font-family: 'Cinzel', serif; font-size: 2.5rem; color: #1f2937; margin-bottom: 1.5rem; line-height: 1.2;">Some Journeys Begin with a Question</h2>
                </div>

                <div style="font-size: 1.125rem; line-height: 1.8; color: #4b5563;">
                    <p style="margin-bottom: 1.5rem;">There are moments in life that quietly change the way you see the world.</p>

                    <p style="margin-bottom: 1.5rem;">For me, it began with a simple question.</p>

                    <p style="margin-bottom: 1.5rem; font-weight: 500; font-size: 1.25rem; color: #1f2937;">Why do we know so little about the temples we visit?</p>

                    <p style="margin-bottom: 1.5rem;">Like millions of people, I grew up visiting temples with my family. We would offer our prayers, receive prasad, and return home with a sense of peace. But over time, I realized that while I had visited countless temples, I knew very little about the stories they carried.</p>

                    <p style="margin-bottom: 1.5rem;">Who built them? Why were they built? What do the carvings mean? Why do certain rituals exist? What history lies beneath every stone?</p>

                    <p style="margin-bottom: 1.5rem;">The answers were always there. We had simply stopped asking the questions.</p>

                    <p style="margin-bottom: 1.5rem;">India's temples are more than places of worship. They are living museums of history, architecture, art, music, philosophy and devotion. Every pillar, every sculpture and every ritual has a story that has travelled through generations. Yet many of these stories are slowly fading with time.</p>

                    <p style="margin-bottom: 1.5rem;">That's when I began wondering...</p>

                    <p style="margin-bottom: 1.5rem; font-style: italic; color: #a63b00;">What if technology could help us reconnect with our heritage?</p>

                    <p style="margin-bottom: 1.5rem;">Not by replacing faith.</p>

                    <p style="margin-bottom: 1.5rem;">Not by replacing darshan.</p>

                    <p style="margin-bottom: 1.5rem;">But by helping us understand the stories that make these sacred places so extraordinary.</p>

                    <p style="margin-bottom: 1.5rem;">That thought became <b>TEERTHA</b>.</p>

                    <p style="margin-bottom: 1.5rem;"><b>TEERTHA</b> is built on a simple belief: technology should preserve culture, not replace it. Through immersive storytelling, digital preservation and meaningful experiences, we hope to help people discover the history, traditions and emotions that have always existed within our temples.</p>

                    <p style="margin-bottom: 1.5rem;">This isn't just about preserving monuments.</p>

                    <p style="margin-bottom: 1.5rem;">It's about preserving memories.</p>

                    <p style="margin-bottom: 1.5rem;">It's about ensuring that the stories which inspired generations before us continue to inspire generations after us.</p>

                    <p style="margin-bottom: 1.5rem;">Because every temple has a story.</p>

                    <p style="margin-bottom: 2.5rem;">And every story deserves to be experienced.</p>

                    <div style="margin-bottom: 2rem;">
                        <img src="assets/images/sign.png" alt="Viral Jain Signature" style="height: 200px; object-fit: contain;">
                    </div>

                    <div style="border-top: 1px solid #e5e7eb; padding-top: 2rem; margin-top: 3rem; display: flex; align-items: center; gap: 1.25rem;">
                        <div style="width: 70px; height: 70px; border-radius: 50%; overflow: hidden; background: #f3f4f6; border: 1px solid #e5e7eb; flex-shrink: 0; cursor: pointer;" onclick="openFounderModal()">
                            <img src="assets/images/founder.jpg" alt="Viral Jain" style="width: 100%; height: 100%; object-fit: cover; filter: grayscale(100%); transform: scale(1); transition: filter 0.4s ease, transform 0.4s ease;" onmouseover="this.style.filter='grayscale(0%)'; this.style.transform='scale(1.1)'" onmouseout="this.style.filter='grayscale(100%)'; this.style.transform='scale(1)'" ontouchstart="this.style.filter='grayscale(0%)'; this.style.transform='scale(1.1)'" ontouchend="this.style.filter='grayscale(100%)'; this.style.transform='scale(1)'" onerror="this.style.display='none'">
                            </div>
                        <div>
                            <p style="font-weight: 600; color: #1f2937; margin: 0 0 0.25rem 0; font-size: 1.1rem;">Viral Jain</p>
                            <p style="color: #6b7280; font-size: 0.95rem; margin: 0;">Founder, TEERTHA</p>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    </section>

    <!-- Founder Image Modal -->
    <div id="founderModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 99999; background: rgba(0, 0, 0, 0.85); justify-content: center; align-items: center; opacity: 0; transition: opacity 0.3s ease;">
        <div style="position: relative; max-width: 90%; max-height: 90%; background: #fff; padding: 6px; border-radius: 12px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); transform: scale(0.9); transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);">
            <button onclick="closeFounderModal()" style="position: absolute; top: -45px; right: 0; background: none; border: none; color: white; font-size: 2.5rem; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'">&times;</button>
            <img src="assets/images/founder.jpg" alt="Viral Jain" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px; display: block;">
        </div>
    </div>

    <script>
        function openFounderModal() {
            const modal = document.getElementById('founderModal');
            const modalContent = modal.querySelector('div > div');
            modal.style.display = 'flex';
            
            // Trigger reflow for transition
            modal.offsetHeight;
            
            modal.style.opacity = '1';
            if (modalContent) modalContent.style.transform = 'scale(1)';
            document.body.style.overflow = 'hidden';
        }

        function closeFounderModal() {
            const modal = document.getElementById('founderModal');
            const modalContent = modal.querySelector('div > div');
            modal.style.opacity = '0';
            if (modalContent) modalContent.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }

        // Close on background click
        document.getElementById('founderModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeFounderModal();
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('founderModal').style.display === 'flex') {
                closeFounderModal();
            }
        });
    </script>
</main>

<?php require __DIR__ . '/includes/page-footer.php'; ?>
